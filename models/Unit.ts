import { UnitType } from "@/enums/UnitType";

export interface Unit {
    id: string;
    name: string;
    description: string;
    type: UnitType;
    foundationDate: Date;
    imageUrl: string;
}