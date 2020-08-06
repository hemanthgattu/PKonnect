import { Injectable } from '@angular/core';
import { ESessionKeys } from '../../constants/sessionKeys.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setItem(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  deleteItem(key: string) {
    sessionStorage.removeItem(key);
  }

  deleteAllItems() {
    const keys = Object.keys(ESessionKeys);
    // tslint:disable-next-line: forin
    for (const item in keys) {
      sessionStorage.removeItem(ESessionKeys[keys[item]]);
    }
  }
}
