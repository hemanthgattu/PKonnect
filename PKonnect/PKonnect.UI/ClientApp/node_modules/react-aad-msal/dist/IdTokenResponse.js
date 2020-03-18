"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interfaces_1 = require("./Interfaces");
var IdTokenResponse = /** @class */ (function () {
    function IdTokenResponse(response) {
        this.state = '';
        if (response.tokenType !== Interfaces_1.TokenType.IdToken) {
            throw new Error("Can't construct an IdTokenResponse from a AuthResponse that has a token type of \"" + response.tokenType + "\".");
        }
        this.idToken = response.idToken;
        this.state = response.accountState;
    }
    return IdTokenResponse;
}());
exports.IdTokenResponse = IdTokenResponse;
//# sourceMappingURL=IdTokenResponse.js.map