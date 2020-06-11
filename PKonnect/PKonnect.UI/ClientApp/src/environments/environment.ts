export const environment = {
  production: false,
  communitiesApi: 'https://communities.pkglobal.com/API/api',
  redirectUri: 'http://localhost:4200/',
  /** azure cloud */
  // tenant: '5786743f-b4c4-4f8e-978e-95d7ff2aef9d',
  // clientId: '870244e3-2770-4ab1-84f3-fb91d35111e5',

  /** azure dev env */
  // tenant: '06b63d62-9374-4d41-a269-4971ff69c4c7',
  // clientId: '034041e9-00bc-4643-891a-eb5da4874b91',

  /** azure prod env */
  // tenant: '06b63d62-9374-4d41-a269-4971ff69c4c7',
  // clientId: 'ae57e1a3-3061-40ce-88ef-6d5c9d385160',

  /** new test keys */
  tenant: '06b63d62-9374-4d41-a269-4971ff69c4c7',
  clientId: 'e2b5fe89-90ac-4d13-912a-92168eb677f6',
  authority: 'https://login.microsoftonline.com/06b63d62-9374-4d41-a269-4971ff69c4c7/',
  OAuthSettings: {
    appId: 'e2b5fe89-90ac-4d13-912a-92168eb677f6',
    scopes: [
      'user.read'
    ]
  },
  amplitudeKey: 'a7e92d34197475a5fc2ea2e23d8938e3',
  sendEvents: false
};
