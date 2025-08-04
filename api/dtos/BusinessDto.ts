export interface BusinessesResponse {
    availableCategories: Array<string>;
    businesses: Array<BusinessDto>;
}

export interface BusinessDto {
    name: string;
    link: string;
    imageUrl: string;
    location?: string;
    categories: Array<string>;
}