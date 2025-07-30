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

        // NOTE: app is public for now
        // this.apiClient.interceptors.request.use(
        //     async (config) => {
        //         const token = await this.secureStorage.getSecret(secretsNames.authToken);
        //         if(token)
        //             config.headers.Authorization = `Bearer ${token}` 

        //         return config;
        //     },
        //     (error) => Promise.reject(error)
        // );
    }

    async getData<T>(url: string): Promise<T> {
        var resp = await this.apiClient.get<T>(url);
        return resp.data;
    }

    async postData<T>(url: string, payload: any): Promise<T> {
        var resp = await this.apiClient.post<T>(url, payload);
        return resp.data;
    }
}