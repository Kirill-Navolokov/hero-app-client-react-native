export interface IRestService {
    getData<T>(url: string) : Promise<T>;
}