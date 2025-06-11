import { UserInfo } from "@/models/UserInfo";

export interface IPreferencesService {
    userInfo(): Promise<UserInfo>;
}