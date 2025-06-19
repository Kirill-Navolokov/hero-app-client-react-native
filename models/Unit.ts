import { UnitType } from "@/enums/UnitType";
import { SocialNetwork } from "./SocialNetwork";

export interface Unit {
    id: string;
    name: string;
    description: string;
    type: UnitType;
    foundationDate: Date;
    imageUrl: string;
    socialNetworks?: SocialNetwork[]
}