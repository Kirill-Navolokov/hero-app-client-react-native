export interface LoginResponse {
    userInfo: {
        email: string;
        username: string;
    },
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}