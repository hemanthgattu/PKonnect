"use strict";
//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
Object.defineProperty(exports, "__esModule", { value: true });
var msal_1 = require("msal");
exports.Account = msal_1.Account;
exports.UserAgentApplication = msal_1.UserAgentApplication;
var AccessTokenResponse_1 = require("./AccessTokenResponse");
exports.AccessTokenResponse = AccessTokenResponse_1.AccessTokenResponse;
var actions_1 = require("./actions");
exports.AuthenticationActions = actions_1.AuthenticationActions;
var AzureAD_1 = require("./AzureAD");
exports.AzureAD = AzureAD_1.AzureAD;
var IdTokenResponse_1 = require("./IdTokenResponse");
exports.IdTokenResponse = IdTokenResponse_1.IdTokenResponse;
var Interfaces_1 = require("./Interfaces");
exports.AuthenticationState = Interfaces_1.AuthenticationState;
exports.LoginType = Interfaces_1.LoginType;
var MsalAuthProvider_1 = require("./MsalAuthProvider");
exports.MsalAuthProvider = MsalAuthProvider_1.MsalAuthProvider;
var withAuthentication_1 = require("./withAuthentication");
exports.withAuthentication = withAuthentication_1.withAuthentication;
exports.default = AzureAD_1.AzureAD;
//# sourceMappingURL=index.js.map