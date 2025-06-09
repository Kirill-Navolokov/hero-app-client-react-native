import { TYPES } from "@/ioc/TypesRegistrations";
import { api } from "./ApiConstants";
import { IRestService } from "./IRestService";
import { inject, injectable } from "inversify";
import { ISecureStorage } from "@/services/ISecureStorage";
import { secretsNames } from "@/utils/appConstants";

@injectable()
export class RestService implements IRestService {
    @inject(TYPES.SecureStorage) private secureStorage!: ISecureStorage;

    async getData<T>(url: string): Promise<T> {
        var requestHeaders = await this.getDefaultHeaders();

        return new Promise<T>(resolve => {
            var endpointUrl = api.baseUrl + url;
            fetch(
                endpointUrl,
                {
                    method: 'GET',
                    headers: requestHeaders
                })
                .then(response => response.json())
                .then(body => resolve(body))
                .catch(error => console.log(error))
        });
    }

    async postData<T>(url: string, payload: any): Promise<T> {
        var requestHeaders = await this.getDefaultHeaders();

        return new Promise<T>(resolve => {
            fetch(
                api.baseUrl + url,
                {
                    method: 'POST',
                    headers: requestHeaders,
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(body => resolve(body))
                .catch(error => console.log(error))
        });
    }

    private async getDefaultHeaders(): Promise<Headers> {
        return new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await this.secureStorage.getSecret(secretsNames.authToken)}`
        });
    }
}