import { Advice, advices, Faq, faqs } from "@/db/schema";
import { ISupportService } from "./ISupportService";
import { inject, injectable } from "inversify";
import { TYPES } from "@/ioc/TypesRegistrations";
import { SecureStorage } from "../SecureStorage";
import { IRestService } from "@/api/IRestService";
import { DbConnection } from "@/db/DbConnection";
import { CacheLastSyncs } from "@/utils/cacheExpirations";
import { cacheTtls, secretsNames } from "@/utils/appConstants";
import shouldSync from "@/utils/helperFunctions";
import { api } from "@/api/ApiConstants";
import { adviceConflictResolver, faqConflictResolver } from "@/db/conflictResolvers";

@injectable()
export class SupportService implements ISupportService {
    @inject(TYPES.SecureStorage) private readonly secureStorage!: SecureStorage;
    @inject(TYPES.RestService) private readonly restService!: IRestService;
    @inject(TYPES.DbConnection) private readonly dbConection!: DbConnection;

    async getAdvices(): Promise<Array<Advice>> {
        let cacheLastSyncs = (await this.secureStorage.getObject<CacheLastSyncs>(secretsNames.cacheLastSyncs))!;
        if(shouldSync(cacheTtls.advices, cacheLastSyncs.advicesLastSync)) {
            console.log("syncing advices");
            let dtos = await this.restService.getData<Array<Advice>>(api.advices);
            await this.dbConection.db.insert(advices).values(dtos)
                .onConflictDoUpdate(adviceConflictResolver());

            cacheLastSyncs.advicesLastSync = Date.now();
            await this.secureStorage.setObject(secretsNames.cacheLastSyncs, cacheLastSyncs);
        }

        let advicesList  = await this.dbConection.db.select().from(advices);

        return advicesList;
    }

    async getFaqs(): Promise<Array<Faq>> {
        let cacheLastSyncs = (await this.secureStorage.getObject<CacheLastSyncs>(secretsNames.cacheLastSyncs))!;
        if(shouldSync(cacheTtls.faqs, cacheLastSyncs.faqsLastSync)) {
            console.log("syncing faqs");
            let dtos = await this.restService.getData<Array<Faq>>(api.faqs);
            await this.dbConection.db.insert(faqs).values(dtos)
                .onConflictDoUpdate(faqConflictResolver());

            cacheLastSyncs.faqsLastSync = Date.now();
            await this.secureStorage.setObject(secretsNames.cacheLastSyncs, cacheLastSyncs);
        }

        let faqsList  = await this.dbConection.db.select().from(faqs);

        return faqsList;
    }
}