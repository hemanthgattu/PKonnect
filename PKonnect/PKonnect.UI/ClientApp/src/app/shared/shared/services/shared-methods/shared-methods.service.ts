import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor() { }

  isMobile() {
    return window.innerWidth < 420 ? true : false;
  }

  isEmployee(employeeId: string): boolean {
    if (employeeId.slice(0, 2) === 'E1') {
      return true;
    }
    return false;
  }

  getTimeDifference(compareTome: string) {
    const dateNow = new Date().getTime();
    const modDate = new Date(compareTome).getTime();
    let diffInMilliSeconds = (dateNow - modDate) / 1000;
    diffInMilliSeconds /= 60 * 60;
    return Math.abs(Math.round(diffInMilliSeconds));
  }

}
