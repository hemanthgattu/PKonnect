import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private msalService: MsalService) {}

  async acquireAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(environment.OAuthSettings)
      .catch((reason) => {
        console.log('Get token failed');
      });

    if (result) {
      return result.accessToken;
    }
    return null;
  }

  getUserDetails() {
    const account = this.msalService.getAccount();
    return {
      email: account.userName,
      name: account.name
    };
  }

}
