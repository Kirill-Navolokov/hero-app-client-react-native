import { Unit } from "@/models/Unit";

export interface IUnitsService {
    getUnits(): Promise<Array<Unit>>;
}