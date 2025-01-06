import { WodHonorship } from "@/enums/WodHonoship";

export interface Wod {
    id: string;
    name: string;
    imageUrl: string;
    honorship: WodHonorship;
    description: string;
    scheme: string;
    wodDate: Date;
}