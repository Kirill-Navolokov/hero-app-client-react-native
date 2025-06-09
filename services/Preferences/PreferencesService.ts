import { inject } from "inversify";
import { IPreferencesService } from "./IPreferencesService";
import { TYPES } from "@/ioc/TypesRegistrations";
import { ISecureStorage } from "../ISecureStorage";
import { secretsNames } from "@/utils/appConstants";
import { UserInfo } from "@/models/UserInfo";

export class PreferencesService implements IPreferencesService {
    @inject(TYPES.SecureStorage) private secureStorage!: ISecureStorage;

    userInfo(): Promise<UserInfo> {
        return this.secureStorage.getObject<UserInfo>(secretsNames.userInfo);
    }
}