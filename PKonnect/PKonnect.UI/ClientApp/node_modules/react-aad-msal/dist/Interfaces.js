"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginType;
(function (LoginType) {
    LoginType[LoginType["Popup"] = 0] = "Popup";
    LoginType[LoginType["Redirect"] = 1] = "Redirect";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
var AuthenticationState;
(function (AuthenticationState) {
    AuthenticationState["Unauthenticated"] = "Unauthenticated";
    AuthenticationState["Authenticated"] = "Authenticated";
})(AuthenticationState = exports.AuthenticationState || (exports.AuthenticationState = {}));
var TokenType;
(function (TokenType) {
    TokenType["IdToken"] = "id_token";
    TokenType["AccessToken"] = "access_token";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
//# sourceMappingURL=Interfaces.js.map