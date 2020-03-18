"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interfaces_1 = require("./Interfaces");
var AccessTokenResponse = /** @class */ (function () {
    function AccessTokenResponse(response) {
        this.accessToken = '';
        this.scopes = [];
        this.state = '';
        if (response.tokenType !== Interfaces_1.TokenType.AccessToken) {
            throw new Error("Can't construct an AccessTokenResponse from a AuthResponse that has a token type of \"" + response.tokenType + "\".");
        }
        this.accessToken = response.accessToken;
        this.expiresOn = response.expiresOn;
        this.scopes = response.scopes;
        this.state = response.accountState;
    }
    return AccessTokenResponse;
}());
exports.AccessTokenResponse = AccessTokenResponse;
//# sourceMappingURL=AccessTokenResponse.js.map