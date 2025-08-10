export type AuthContextType = {
    googleSignIn: () => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (data: any) => Promise<void>;
}