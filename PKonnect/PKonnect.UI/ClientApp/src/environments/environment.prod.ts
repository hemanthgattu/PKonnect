export const environment = {
  production: true,
  // prod env configs
  communitiesApi: 'https://communities.pkglobal.com/API/api',
  redirectUri: 'https://communities.pkglobal.com/',
  tenant: '06b63d62-9374-4d41-a269-4971ff69c4c7',
  clientId: 'ae57e1a3-3061-40ce-88ef-6d5c9d385160',
  authority: 'https://login.microsoftonline.com/06b63d62-9374-4d41-a269-4971ff69c4c7/',
  OAuthSettings: {
    appId: 'ae57e1a3-3061-40ce-88ef-6d5c9d385160',
    scopes: [
      'User.Read',
      'User.ReadBasic.All'
    ]
  },
  amplitudeKey: 'a7e92d34197475a5fc2ea2e23d8938e3',
  sendEvents: true

  // test prod env configs
  // communitiesApi: 'https://communities.pkglobal.com/API/api',
  // redirectUri: 'https://communities.pkglobal.com/',
  // tenant: '06b63d62-9374-4d41-a269-4971ff69c4c7',
  // clientId: 'e2b5fe89-90ac-4d13-912a-92168eb677f6',
  // authority: 'https://login.microsoftonline.com/06b63d62-9374-4d41-a269-4971ff69c4c7/',
  // OAuthSettings: {
  //   appId: 'e2b5fe89-90ac-4d13-912a-92168eb677f6',
  //   scopes: [
  //     'User.Read'
  //   ]
  // },
  // amplitudeKey: 'a7e92d34197475a5fc2ea2e23d8938e3',
  // sendEvents: true

  // dev env configs
  // communitiesApi: 'https://communities-dev.pkglobal.com/API/api',
  // redirectUri: 'https://communities-dev.pkglobal.com/',
  // tenant: '06b63d62-9374-4d41-a269-4971ff69c4c7',
  // clientId: '034041e9-00bc-4643-891a-eb5da4874b91',
  // amplitudeKey: 'a7e92d34197475a5fc2ea2e23d8938e3',
  // sendEvents: false
};
