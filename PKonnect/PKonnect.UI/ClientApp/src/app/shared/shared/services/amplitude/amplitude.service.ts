import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as amplitude from 'amplitude-js';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {

  private props = {
    role: '',
    skill: []
  };
  constructor(private authSvc: AuthService) { }

  initilize() {
    const userId = this.authSvc.getUserDetails().email.split('@')[0];
    if (!!userId) {
      amplitude.getInstance().init(environment.amplitudeKey, userId);
    }
  }

  // setEvent(eventName: string, eventProperty?: any) {
  //   if (eventProperty) {
  //     this.props.role = eventProperty.role;
  //     this.props.skill = eventProperty.skillName;
  //   }
  //   if (environment.sendEvents ) {
  //     if (this.props && !!this.props.role || this.props.skill.length > 0) {
  //       amplitude.getInstance().logEvent(eventName, this.props);
  //     } else {
  //       amplitude.getInstance().logEvent(eventName);
  //     }
  //   }
  // }

  setEvent(eventName: string, eventProperty?: any) {
    if (environment.sendEvents) {
      if (!!eventProperty) {
        amplitude.getInstance().logEvent(eventName, eventProperty);
      } else {
        amplitude.getInstance().logEvent(eventName);
      }
    } else {
      if (!!eventProperty) {
        console.log(eventName);
        console.log(eventProperty);
      } else {
        console.log(eventName);
      }
    }
  }
}
