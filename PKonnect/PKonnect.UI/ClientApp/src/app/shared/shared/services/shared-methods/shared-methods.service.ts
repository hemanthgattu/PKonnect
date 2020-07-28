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

  getTimeDifference(compareTime: string) {
    const dateNow = new Date().getTime();
    const modDate = new Date(compareTime).getTime();
    let diffInMilliSeconds = (dateNow - modDate) / 1000;
    diffInMilliSeconds /= 60 * 60;
    return Math.abs(Math.round(diffInMilliSeconds));
  }

  isNewHire(hireDateTime: string): boolean {
    const todayDateTime = new Date().getTime();
    const compareDateTime = new Date(hireDateTime).getTime();
    let diffInMilliSeconds = (todayDateTime - compareDateTime) / 1000;
    diffInMilliSeconds /= 60 * 60 * 24;
    if (Math.abs(Math.round(diffInMilliSeconds)) < 30) {
      return true;
    }
    return false;
  }

  setEmployeeProjectComments(reason: string, comment?: string, startDate?: string, expectedClient?: string): string {
    if (reason === 'Proposed for Assignment') {
      return 'Proposed Client: ' + expectedClient + '\n Expected Start Date: ' + new Date(startDate).toDateString();
    } else if (reason === 'Available for Assignment' && comment.toLowerCase() !== 'missing') {
      return comment;
    }
  }

}
