import { inject, injectable } from "inversify";
import { IBusinessesService } from "./IBusinessesService";
import { BusinessDto } from "@/api/dtos/BusinessDto";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import Fuse from "fuse.js";
import { ISecureStorage } from "../ISecureStorage";
import { DbConnection } from "@/db/DbConnection";
import { CacheLastSyncs } from "@/utils/cacheExpirations";
import { cacheTtls, secretsNames } from "@/utils/appConstants";
import shouldSync from "@/utils/helperFunctions";
import { Business, businesses, categories } from "@/db/schema";
import { BusinessesResponseDto } from "@/api/dtos/BusinessesResponseDto";
import { businessConflictResolver, categoriesConflictResolver } from "@/db/conflictResolvers";

@injectable()
export class BusinessesService implements IBusinessesService {
    private readonly businessesFuse: Fuse<BusinessDto>;

    @inject(TYPES.RestService) private readonly restService!: IRestService;
    @inject(TYPES.SecureStorage) private readonly secureStorage!: ISecureStorage;
    @inject(TYPES.DbConnection) private readonly dbConnection!: DbConnection;

    constructor() {
        this.businessesFuse = new Fuse<BusinessDto>(Array<BusinessDto>(), {
            keys: [
                {name: 'name'},
                {
                    name: 'categories',
                    getFn: (obj) => obj.categories.join(' '),
                }],
            threshold: 0.3, // adjust for fuzziness,
            ignoreLocation: true,
            useExtendedSearch: true,
            includeScore: true
        });
    }

    async search(partOfName: string, categories: Array<string>): Promise<Array<BusinessDto>> {
        if(partOfName == "" && categories.length == 0)
            return await this.dbConnection.db.select().from(businesses);;

        if(partOfName != "" && categories.length != 0) {
            let matchMap = this.searchByCategories(categories);
            return matchMap.size == 0
                ? []
                : this.getFilteredBusinessesByName(partOfName, matchMap);
        } else {
            return partOfName != ""
                ? this.searchByName(partOfName)
                : Array.from(this.searchByCategories(categories).values());
        }
    }

    async getBusinesses(forced: boolean): Promise<BusinessesResponseDto> {
        let cacheLastSyncs = (await this.secureStorage.getObject<CacheLastSyncs>(secretsNames.cacheLastSyncs))!;
        if(forced || shouldSync(cacheTtls.businesses, cacheLastSyncs.businessesLastSync)) {
            console.log("fetching businesses");
            let dto = await this.restService.getData<BusinessesResponseDto>(api.businesses);
            await this.dbConnection.db.transaction(async tx => {
                await tx.insert(businesses).values(dto.businesses.map(item => this.mapBusiness(item)))
                    .onConflictDoUpdate(businessConflictResolver())
                await tx.insert(categories).values(dto.availableCategories.map(item => {
                    return {
                        name: item
                    };
                })).onConflictDoUpdate(categoriesConflictResolver())
            });

            cacheLastSyncs.businessesLastSync = Date.now();
            await this.secureStorage.setObject(secretsNames.cacheLastSyncs, cacheLastSyncs);
        }
        let businessesList = await this.dbConnection.db.select().from(businesses);
        let categoriesList = await this.dbConnection.db.select().from(categories);
        let resp = {
            availableCategories: categoriesList.map(c => c.name),
            businesses: businessesList
        };

        this.businessesFuse.setCollection(resp.businesses);

        return resp;
    }

    private searchByName(partOfName: string): Array<BusinessDto> {
        return this.businessesFuse.search({name: partOfName}).map(i => i.item);
    }

    private searchByCategories(categories: Array<string>): Map<string, BusinessDto> {
        var matchMap = new Map<string, BusinessDto>();
        categories.flatMap(c => this.businessesFuse.search({categories:c}))
            .forEach(fuseResult => {
                if(!matchMap.has(fuseResult.item.name))
                    matchMap.set(fuseResult.item.name, fuseResult.item);
            });

        return matchMap;
    }

    private getFilteredBusinessesByName(
        partOfName: string,
        matchedByCategories: Map<string, BusinessDto>
    ): Array<BusinessDto> {
        let namesFuse = new Fuse(Array.from(matchedByCategories.keys()));
        let matchedNames = namesFuse.search(partOfName);
        if(matchedNames.length == 0) {
            return Array.from(matchedByCategories.values());
        } else {
            let businesses = Array<BusinessDto>();
            matchedNames.forEach(n => {
                var business = matchedByCategories.get(n.item);
                if(business != undefined)
                    businesses.push(business);
            });

            return businesses;
        }
    }

    private mapBusiness(businessDto: BusinessDto): Business {
        const {
            id,
            name,
            link,
            imageUrl,
            categories
        } = businessDto;

        return {
            id: id,
            name: name,
            link: link,
            imageUrl: imageUrl,
            categories: categories
        };
    }
}