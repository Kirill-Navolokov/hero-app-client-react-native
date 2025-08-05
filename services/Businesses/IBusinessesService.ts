import { BusinessDto, BusinessesResponse } from "@/api/dtos/BusinessDto";

export interface IBusinessesService {
    getBusinesses(): Promise<BusinessesResponse>;

    search(partOfName: string, categories: Array<string>): Promise<Array<BusinessDto>>;
}