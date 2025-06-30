import { inject, injectable } from "inversify";
import { IUnitsService } from "./IUnitsService";
import { TYPES } from "@/ioc/TypesRegistrations";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import { UnitDto } from "@/api/dtos/UnitDto";
import { UnitType } from "@/enums/UnitType";
import { SocialNetwork } from "@/models/SocialNetwork";
import { Workout } from "@/models/Workout";
import { WorkoutDto } from "@/api/dtos/WorkoutDto";
import { Unit, units } from "@/db/schema";
import { DbConnection } from "@/db/DbConnection";
import { ISecureStorage } from "../ISecureStorage";
import { CacheLastSyncs } from "@/utils/cacheExpirations";
import { cacheTtls, secretsNames } from "@/utils/appConstants";
import shouldSync from "@/utils/helperFunctions";
import { SQLiteInsertOnConflictDoUpdateConfig } from "drizzle-orm/sqlite-core";
import { eq, sql } from "drizzle-orm";

@injectable()
export class UnitsService implements IUnitsService {
    private readonly unitTypeMappings: {[num: number]: UnitType};

    @inject(TYPES.SecureStorage) private secureStorage!: ISecureStorage;
    @inject(TYPES.RestService) private restService!: IRestService;
    @inject(TYPES.DbConnection) private dbConection!: DbConnection;

    constructor() {
        this.unitTypeMappings = {
            0: UnitType.unit,
            1: UnitType.community,
        }
    }

    async getUnits(): Promise<[Array<Unit>, Array<Unit>]> {
        var cacheLastSyncs = (await this.secureStorage.getObject<CacheLastSyncs>(secretsNames.cacheLastSyncs))!;
        var unitsList = new Array<Unit>();
        var communitiesList = new Array<Unit>();
        if(!shouldSync(cacheTtls.units, cacheLastSyncs.unitsLastSync)) {
            unitsList  = await this.dbConection.db.select().from(units)
                .where(eq(units.type, UnitType.unit));
            communitiesList  = await this.dbConection.db.select().from(units)
                .where(eq(units.type, UnitType.community));
            if(unitsList.length != 0 && communitiesList.length != 0)
                return [unitsList, communitiesList];
        }

        console.log('syncing units');
        var dtos = await this.restService.getData<Array<UnitDto>>(api.units);
        dtos.forEach(item => {
            var unit = this.mapUnit(item);
            if(unit.type == UnitType.unit)
                unitsList.push(unit);
            
            communitiesList.push(unit);
        });
        await this.dbConection.db.transaction(async tx => {
            await Promise.all([
                tx.insert(units).values(unitsList).onConflictDoUpdate(this.unitConflictResolver()),
                tx.insert(units).values(communitiesList).onConflictDoUpdate(this.unitConflictResolver())
            ]);
        });

        cacheLastSyncs.unitsLastSync = Date.now();
        await this.secureStorage.setObject(secretsNames.cacheLastSyncs, cacheLastSyncs);
        
        return [unitsList, communitiesList];
    }

    async getUnitWorkouts(unitId: string): Promise<Array<Workout>> {
        var dtos = await this.restService.getData<Array<WorkoutDto>>(
            `${api.units}/${unitId}${api.wods}`);
        var workouts = dtos.map(this.mapWorkout);

        return workouts;
    }

    private unitConflictResolver(): SQLiteInsertOnConflictDoUpdateConfig<any> {
        return {
            target: units.id,
            set: {
                name: sql.raw(`excluded.name`),
                description: sql.raw(`excluded.description`),
                type: sql.raw(`excluded.type`),
                foundationDate: sql.raw(`excluded.foundationDate`),
                imageUrl: sql.raw(`excluded.imageUrl`),
                socialNetworks: sql.raw(`excluded.socialNetworks`)
            }
        }
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
                ? null
                : JSON.stringify(Object.entries(socialNetworks!).map<SocialNetwork>(t => {
                    return({
                        type: Number(t[0]),
                        link: t[1]
                    })}
                ))
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