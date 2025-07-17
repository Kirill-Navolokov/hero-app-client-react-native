import { inject, injectable } from "inversify";
import { IAuthService } from "./IAuthService";
import { TYPES } from "@/ioc/TypesRegistrations";
import { ISecureStorage } from "../ISecureStorage";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { secretsNames } from "@/utils/appConstants";
import { IRestService } from "@/api/IRestService";
import { api } from "@/api/ApiConstants";
import { Login } from "@/models/Login";
import { LoginResponse } from "@/models/LoginResponse";
import { DbConnection } from "@/db/DbConnection";
import { advices, faqs, units, wods } from "@/db/schema";

@injectable()
export class AuthService implements IAuthService {
    @inject(TYPES.SecureStorage) private secureStorage!: ISecureStorage;
    @inject(TYPES.RestService) private restService!: IRestService;
    @inject(TYPES.DbConnection) private dbConection!: DbConnection;

    constructor() {
    }

    async signIn(email: string, password: string): Promise<void> {
        var loginRequest: Login = {
            email: email,
            password: password
        };

        var loginResponse = await this.restService.postData<LoginResponse>(api.login, loginRequest);
        await Promise.all([
            this.secureStorage.setSecret(secretsNames.authToken, loginResponse.tokens.accessToken),
            this.secureStorage.setSecret(secretsNames.refreshToken, loginResponse.tokens.refreshToken),
            this.secureStorage.setObject(secretsNames.userInfo, loginResponse.userInfo),
            this.secureStorage.verifyCacheLastSyncs()
        ]);
    }

    async googleSignIn(): Promise<boolean> {
        try {
            // await GoogleSignin.hasPlayServices();
            // var response = await GoogleSignin.signIn();
            // if(response.type === "cancelled")
            //     return false;

            // await this.secureStorage.setSecret(secretsNames.authToken, response.data.idToken!);

            return true;

        } catch(e: any) {
            console.log(e);
            return false;
        }

        // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         await GoogleSignin.signIn()
    //         //.then(responce => {
    //             var token = GoogleSignin.getTokens().then(tokens => {
    //                 var a  = tokens.accessToken;
    //                 var b = tokens.idToken;

    //                 console.log(a);
    //                 console.log(b);
    //             })
    //         //});

    //         //console.log(userInfo);
    //     } catch (error: any) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             console.log('User cancelled the login flow');
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             console.log('Signing in');
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             console.log('Play services not available');
    //         } else {
    //             console.log('Some other error happened');
    //             console.log(error.message);
    //             console.log(error.code);
    //         }
    //     }
    // };
    }

    async logout(): Promise<void> {
        await Promise.all([
            this.secureStorage.clear(),
            this.dbConection.dropData()
        ]);
    }

    async verifyTokens(): Promise<boolean> {
        try {
            var accessToken = await this.secureStorage.getSecret(secretsNames.authToken);
            var refreshToken = await this.secureStorage.getSecret(secretsNames.refreshToken);

            return accessToken != null && refreshToken != null;
        } catch(error) {
            console.log(error);

            return false;
        }
    }
}