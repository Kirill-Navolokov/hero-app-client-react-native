import { Unit } from "@/db/schema";
import { Workout } from "@/models/Workout";

export interface IUnitsService {
    getUnits(forced: boolean): Promise<[Array<Unit>, Array<Unit>]>;

    getUnitWorkouts(unitId: string): Promise<Array<Workout>>;
}