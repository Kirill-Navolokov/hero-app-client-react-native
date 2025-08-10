export interface IRestService {
    getData<T>(url: string) : Promise<T>;

    postData<T>(url: string, payload: any): Promise<T>;
}