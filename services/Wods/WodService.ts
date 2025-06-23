import { Wod } from "@/models/Wod";
import { WodDto } from "@/dtos/WodDto";
import { IWodService } from "./IWodService";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import { inject, injectable } from "inversify";
import { TYPES } from "@/ioc/TypesRegistrations";
import { WodHonorship } from "@/enums/WodHonoship";

@injectable()
export class WodService implements IWodService {
    @inject(TYPES.RestService) private restService!: IRestService;
    private readonly wodHonorshipMappings: {[num: number]: WodHonorship};

    constructor() {
        this.wodHonorshipMappings = {
            0: WodHonorship.hero ,
            1: WodHonorship.memorial,
            2: WodHonorship.unit
        }
    }

    async getWods(): Promise<Array<Wod>> {
        var dtos = await this.restService.getData<Array<WodDto>>(api.wods);
        var wods = new Array<Wod>();
        dtos.forEach(element => {
            wods.push(this.mapWod(element))
        });

        return wods;
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
            unitId: unitId,
            name: name,
            description: description,
            scheme: scheme,
            executionDate: new Date(executionDate),
            creationDate: new Date(creationDate),
            type: this.wodHonorshipMappings[type],
            imageUrl: imageUrl,
            backgroundUrl: backgroundUrl,
        };
    }
}