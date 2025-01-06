import { Wod } from "@/models/Wod";

export interface IWodService {
    getWods() : Promise<Array<Wod>>;
}