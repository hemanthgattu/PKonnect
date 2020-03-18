import { Account } from 'msal';
export declare type AccountInfoCallback = (token: IAccountInfo) => void;
export declare enum LoginType {
    Popup = 0,
    Redirect = 1
}
export declare enum AuthenticationState {
    Unauthenticated = "Unauthenticated",
    Authenticated = "Authenticated"
}
export interface IAccountInfo {
    jwtAccessToken: string;
    jwtIdToken: string;
    account: Account;
}
export declare enum TokenType {
    IdToken = "id_token",
    AccessToken = "access_token"
}
export interface IAuthProvider {
    onAuthenticationStateChanged?: (state: AuthenticationState, account?: IAccountInfo) => void;
    authenticationState: AuthenticationState;
    getAccountInfo(): IAccountInfo | null;
    login(): void;
    logout(): void;
}
