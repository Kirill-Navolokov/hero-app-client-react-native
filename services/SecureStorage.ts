import { injectable } from "inversify";
import { ISecureStorage } from "./ISecureStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

@injectable()
export class SecureStorage implements ISecureStorage {
    clear():  Promise<void> {
        return AsyncStorage.clear();
    }

    async getSecret(name: string): Promise<string> {
        var secret = await AsyncStorage.getItem(name);
        return secret!;
    }

    async getObject<T>(name: string): Promise<T> {
        var stringItem = await AsyncStorage.getItem(name);
        return JSON.parse(stringItem!) as T;
    }

    setSecret(name: string, secret: string): Promise<void> {
        return AsyncStorage.setItem(name, secret);
    }

    setObject(name: string, object: any): Promise<void> {
        return AsyncStorage.setItem(name, JSON.stringify(object));
    }
}