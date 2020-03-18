import { MsalAuthProvider, LoginType } from 'react-aad-msal';

export const authProvider = new MsalAuthProvider(
    {
        auth: {
            authority: "https://login.microsoftonline.com/common",
            clientId: "870244e3-2770-4ab1-84f3-fb91d35111e5" //Application (client) ID from Overview blade in App Registration
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: true,
        },
    },
    {
        scopes: ['https://graph.microsoft.com/.default']
    },

    LoginType.Popup
);
