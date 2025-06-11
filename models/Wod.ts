import { WodHonorship } from "@/enums/WodHonoship";

export interface Wod {
    id: string;
    unitId?: string;
    name: string;
    description: string;
    scheme: string;
    executionDate: Date;
    creationDate: Date;
    type: WodHonorship;
    imageUrl: string;
    backgroundUrl?: string;
}