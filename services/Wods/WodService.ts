import { WodDto } from "@/api/dtos/WodDto";
import { IWodService } from "./IWodService";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import { inject, injectable } from "inversify";
import { TYPES } from "@/ioc/TypesRegistrations";
import { WodHonorship } from "@/enums/WodHonoship";
import { ISecureStorage } from "../ISecureStorage";
import { CacheLastSyncs } from "@/utils/cacheExpirations";
import { cacheTtls, secretsNames } from "@/utils/appConstants";
import shouldSync from "@/utils/helperFunctions";
import { DbConnection } from "@/db/DbConnection";
import { Wod, wods } from "@/db/schema";
import { sql, asc } from "drizzle-orm";
import { wodConflictResolver } from "@/db/conflictResolvers";
import Fuse from 'fuse.js';

@injectable()
export class WodService implements IWodService {
    private readonly wodHonorshipMappings: {[num: number]: WodHonorship};
    private readonly wodsFuse: Fuse<Wod>;

    @inject(TYPES.SecureStorage) private secureStorage!: ISecureStorage;
    @inject(TYPES.RestService) private restService!: IRestService;
    @inject(TYPES.DbConnection) private dbConection!: DbConnection;

    constructor() {
        this.wodHonorshipMappings = {
            0: WodHonorship.hero ,
            1: WodHonorship.memorial,
            2: WodHonorship.unit
        }

        this.wodsFuse = new Fuse<Wod>(Array<Wod>(), {
            keys: ['name'],
            threshold: 0.4, // adjust for stricter or looser matching
            ignoreLocation: true,
            includeScore: true,
        });
    }

    async searchByName(partOfName: string): Promise<Array<Wod>> {
        const matches = this.wodsFuse.search(partOfName);

        return matches.map(r => r.item);
    }

    async getWods(forced: boolean): Promise<Array<Wod>> {
        let cacheLastSyncs = (await this.secureStorage.getObject<CacheLastSyncs>(secretsNames.cacheLastSyncs))!;
        if(forced || shouldSync(cacheTtls.wods, cacheLastSyncs.wodsLastSync)) {
            console.log("syncing wods");
            let dtos = await this.restService.getData<Array<WodDto>>(api.wods);
            await this.dbConection.db.insert(wods).values(dtos.map(item => this.mapWod(item)))
                .onConflictDoUpdate(wodConflictResolver());

            cacheLastSyncs.wodsLastSync = Date.now();
            await this.secureStorage.setObject(secretsNames.cacheLastSyncs, cacheLastSyncs);
        }

        let wodsList  = await this.dbConection.db.select().from(wods)
            .orderBy(asc(
                sql`strftime('%m-%d', datetime(${wods.executionDate}, 'unixepoch'))`
            ));
        this.wodsFuse.setCollection(wodsList);

        return wodsList;
    }

    private mapWod(wodDto: WodDto): Wod {
        const { 
            id,
            unitId,
            name,
            description,
            scheme,
            executionDate,
            creationDate,
            type,
            imageUrl,
            backgroundUrl
        } = wodDto;

        return {
            id: id,
            unitId: unitId == undefined ? null: unitId,
            name: name,
            description: description,
            scheme: scheme,
            executionDate: new Date(executionDate),
            creationDate: new Date(creationDate),
            type: this.wodHonorshipMappings[type],
            imageUrl: imageUrl,
            backgroundUrl: backgroundUrl == undefined ? null : backgroundUrl,
        };
    }
}