export interface ISecureStorage {
    clear(): Promise<void>;

    getSecret(name: string): Promise<string | null>;

    getObject<T>(name: string): Promise<T | null>;

    setSecret(name: string, secret: string): Promise<void>;

    setObject(name: string, object: any): Promise<void>;

    verifyCacheLastSyncs(): Promise<void>;
}