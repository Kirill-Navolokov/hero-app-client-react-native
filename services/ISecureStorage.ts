export interface ISecureStorage {
    clear(): Promise<void>;

    getSecret(name: string): Promise<string>;

    getObject<T>(name: string): Promise<T>;

    setSecret(name: string, secret: string): Promise<void>;

    setObject(name: string, object: any): Promise<void>
}