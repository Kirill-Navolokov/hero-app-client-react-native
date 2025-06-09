export interface IAuthService {
    signIn(email: string, password: string): Promise<void>;

    googleSignIn(): Promise<boolean>;

    logout(): Promise<void>;
}