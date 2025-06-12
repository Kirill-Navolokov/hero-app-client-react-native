import { inject, injectable } from "inversify";
import { IUnitsService } from "./IUnitsService";
import { Unit } from "@/models/Unit";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import { UnitDto } from "@/dtos/UnitDto";
import { UnitType } from "@/enums/UnitType";

@injectable()
export class UnitsService implements IUnitsService {
    @inject(TYPES.RestService) private restService!: IRestService;
    private readonly unitTypeMappings: {[num: number]: UnitType};

    constructor() {
        this.unitTypeMappings = {
            0: UnitType.unit,
            1: UnitType.community,
        }
    }

    async getUnits(): Promise<Array<Unit>> {
        var dtos = await this.restService.getData<Array<UnitDto>>(api.units);
        var units = new Array<Unit>();
        dtos.forEach(element => {
            units.push(this.mapUnit(element))
        });
        
        return units;
    }

    private mapUnit(unitDto: UnitDto): Unit {
            const { 
                id,
                name,
                description,
                type,
                imageUrl,
                foundationDate,
            } = unitDto;

            return {
                id: id,
                name: name,
                description: description,
                type: this.unitTypeMappings[type],
                foundationDate: new Date(foundationDate),
                imageUrl: imageUrl,
            };
        }
}