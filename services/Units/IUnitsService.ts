import { Unit } from "@/models/Unit";
import { Workout } from "@/models/Workout";

export interface IUnitsService {
    get units(): Array<Unit>;
    get communities(): Array<Unit>;

    getUnits(): Promise<Array<Unit>>;
    getUnitWorkouts(unitId: string): Promise<Array<Workout>>;
}