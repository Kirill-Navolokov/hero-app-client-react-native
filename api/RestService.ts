import { TYPES } from "@/ioc/TypesRegistrations";
import { api } from "./ApiConstants";
import { IRestService } from "./IRestService";
import { inject, injectable } from "inversify";
import { ISecureStorage } from "@/services/ISecureStorage";
import { secretsNames } from "@/utils/appConstants";
import axios, { AxiosInstance } from "axios";

@injectable()
export class RestService implements IRestService {
    private readonly apiClient: AxiosInstance;
    @inject(TYPES.SecureStorage) private secureStorage!: ISecureStorage;

    constructor() {
        this.apiClient = axios.create({
            baseURL: api.baseUrl,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        this.apiClient.interceptors.request.use(
            async (config) => {
                const token = await this.secureStorage.getSecret(secretsNames.authToken);
                if(token)
                    config.headers.Authorization = `Bearer ${token}` 

                return config;
            },
            (error) => Promise.reject(error)
        );

        // this.apiClient.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const originalRequest = error.config;
        //         if (error.response.status === 401 && !originalRequest._retry) {
        //             //originalRequest._retry = true;
        //             const refreshToken = await this.secureStorage.getSecret(secretsNames.refreshToken);
        //             if (refreshToken) {
        //                 try {
        //                     console.log('refreshing token');
        //                     const response = await axios.post<TokenRefreshResponse>(api.baseUrl + '/token-refresh',null, {
        //                         headers: {
        //                             'Authorization': `Bearer ${refreshToken}`
        //                         }
        //                     });
        //                     console.log('refreshing token resp');
        //                     // don't use axious instance that already configured for refresh token api call
        //                     const newAccessToken = response.data.accessToken;
        //                     await this.secureStorage.setSecret(secretsNames.authToken, newAccessToken);
        //                     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //                     return axios(originalRequest); //recall Api with new token
        //                 } catch (err) {
        //                     // Handle token refresh failure
        //                     // mostly logout the user and re-authenticate by login again
        //                     var h = new HeroBookError();
        //                     h.status = 401;
        //                     h.payload = err;
        //                     return Promise.reject(h);
        //                 }
        //             }
        //         }
        //         return Promise.reject(error);
        //     }
        // );
    }

    async getData<T>(url: string): Promise<T> {
        // var requestHeaders = await this.getDefaultHeaders();

        // return new Promise<T>(resolve => {
        //     var endpointUrl = api.baseUrl + url;
        //     fetch(
        //         endpointUrl,
        //         {
        //             method: 'GET',
        //             headers: requestHeaders
        //         })
        //         .then(response => response.json())
        //         .then(body => resolve(body))
        //         .catch(error => console.log(error))
        // });
        //var resp = await this.apiClient.get<T>(url);
        var resp = await this.apiClient.get<T>(url);
        return resp.data;
    }

    async postData<T>(url: string, payload: any): Promise<T> {
        //var requestHeaders = await this.getDefaultHeaders();

        // return new Promise<T>(resolve => {
        //     fetch(
        //         api.baseUrl + url,
        //         {
        //             method: 'POST',
        //             headers: requestHeaders,
        //             body: JSON.stringify(payload)
        //         })
        //         .then(response => response.json())
        //         .then(body => resolve(body))
        //         .catch(error => console.log(error))
        // });
        var resp = await this.apiClient.post<T>(url, payload);
        return resp.data;
    }

    private async getDefaultHeaders(): Promise<Headers> {
        return new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await this.secureStorage.getSecret(secretsNames.authToken)}`
        });
    }
}