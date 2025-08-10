import { BusinessDto } from "./BusinessDto";

export interface BusinessesResponseDto {
    availableCategories: Array<string>;
    businesses: Array<BusinessDto>;
}