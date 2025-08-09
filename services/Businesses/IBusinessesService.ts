import { BusinessDto } from "@/api/dtos/BusinessDto";
import { BusinessesResponseDto } from "@/api/dtos/BusinessesResponseDto";

export interface IBusinessesService {
    getBusinesses(forced: boolean): Promise<BusinessesResponseDto>;

    search(partOfName: string, categories: Array<string>): Promise<Array<BusinessDto>>;
}