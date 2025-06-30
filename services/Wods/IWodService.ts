import { Wod } from "@/db/schema";

export interface IWodService {
    getWods() : Promise<Array<Wod>>;
}