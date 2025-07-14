import { Wod } from "@/db/schema";

export interface IWodService {
    getWods(forced: boolean) : Promise<Array<Wod>>;

    searchByName(partOfName: string): Promise<Array<Wod>>;
}