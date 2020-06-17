import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as amplitude from 'amplitude-js';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {

  private props = {
    role: '',
    skill: []
  };
  constructor() { }

  initilize() {
    // const userId = this.adalSvc.LoggedInUserEmail.split('@')[0];
    const userId = '';
    if (!!userId) {
      amplitude.getInstance().init(environment.amplitudeKey, userId);
    }
  }

  setEvent(eventName: string, eventProperty?: any) {
    if (eventProperty) {
      this.props.role = eventProperty.role;
      this.props.skill = eventProperty.skillName;
    }
    if (environment.sendEvents ) {
      if (this.props && !!this.props.role || this.props.skill.length > 0) {
        amplitude.getInstance().logEvent(eventName, this.props);
      } else {
        amplitude.getInstance().logEvent(eventName);
      }
    }
  }
}
