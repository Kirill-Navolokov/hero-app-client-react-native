import { inject, injectable } from "inversify";
import { IUnitsService } from "./IUnitsService";
import { Unit } from "@/models/Unit";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import { UnitDto } from "@/api/dtos/UnitDto";
import { UnitType } from "@/enums/UnitType";
import { SocialNetwork } from "@/models/SocialNetwork";
import { Workout } from "@/models/Workout";
import { WorkoutDto } from "@/api/dtos/WorkoutDto";

@injectable()
export class UnitsService implements IUnitsService {
    @inject(TYPES.RestService) private restService!: IRestService;
    private readonly unitTypeMappings: {[num: number]: UnitType};

    private readonly unitsArray: Unit[];
    private readonly communitiesArray: Unit[];

    constructor() {
        this.unitsArray = [];
        this.communitiesArray = [];

        this.unitTypeMappings = {
            0: UnitType.unit,
            1: UnitType.community,
        }
    }
    get units(): Unit[] {
        return this.unitsArray;
    }
    get communities(): Unit[] {
        return this.communitiesArray;
    }

    async getUnits(): Promise<Array<Unit>> {
        this.unitsArray.length = 0;
        this.communitiesArray.length = 0;

        var dtos = await this.restService.getData<Array<UnitDto>>(api.units);
        var units = new Array<Unit>();
        dtos.forEach(element => {
            var unit = this.mapUnit(element);
            units.push(unit);

            if(unit.type == UnitType.unit)
                this.unitsArray.push(unit);
            else
                this.communitiesArray.push(unit);
        });
        
        return units;
    }

    async getUnitWorkouts(unitId: string): Promise<Array<Workout>> {
        var dtos = await this.restService.getData<Array<WorkoutDto>>(
            `${api.units}/${unitId}${api.wods}`);
        var workouts = dtos.map(this.mapWorkout);

        return workouts;
    }

    private mapUnit(unitDto: UnitDto): Unit {
        const { 
            id,
            name,
            description,
            type,
            imageUrl,
            foundationDate,
            socialNetworks,
        } = unitDto;

        return {
            id: id,
            name: name,
            description: description,
            type: this.unitTypeMappings[type],
            foundationDate: new Date(foundationDate),
            imageUrl: imageUrl,
            socialNetworks: socialNetworks == undefined
                ? undefined
                : Object.entries(socialNetworks!).map<SocialNetwork>(t => {
                    return({
                        type: Number(t[0]),
                        link: t[1]
                    })}
                )
        };
    }

    private mapWorkout(workoutDto: WorkoutDto): Workout {
        const {
            id,
            name,
            date,
            description
        } = workoutDto;

        return {
            id: id,
            name: name,
            date: new Date(date),
            description: description
        };
    }
}