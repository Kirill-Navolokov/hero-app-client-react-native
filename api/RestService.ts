import { api } from "./ApiConstants";
import { IRestService } from "./IRestService";
import { injectable } from "inversify";

@injectable()
export class RestService implements IRestService {
    async getData<T>(url: string): Promise<T> {
        return new Promise<T>(resolve => {
            var endpointUrl = api.baseUrl + url;
            fetch(endpointUrl)
                .then(response => response.json())
                .then(body => resolve(body))
                .catch(error => console.log(error))
        })
    }
}