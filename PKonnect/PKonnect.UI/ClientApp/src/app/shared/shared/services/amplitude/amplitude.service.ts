import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
// const amplitude = require('amplitude-js');
import * as amplitude from 'amplitude-js';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {

  constructor(private adalSvc: MsAdalAngular6Service) { }

  initilize() {
    const userId = this.adalSvc.LoggedInUserEmail.split('@')[0];
    if (!!userId) {
      amplitude.getInstance().init(environment.amplitudeKey, userId);
    }
  }

  setEvent(eventName: string, eventProperty?: any) {
    if (environment.sendEvents) {
      amplitude.getInstance().logEvent(eventName);
    }
  }
}
