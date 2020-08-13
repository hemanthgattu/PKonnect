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
    const NO_DATA = 'No data available';
    if (reason === 'Proposed for Assignment') {
      let details = '';
      if (!!expectedClient) {
        details += 'Proposed Client: ' + expectedClient;
      } else if (!expectedClient) {
        details += 'Proposed Client: ' + NO_DATA;
      }
      if (!!startDate) {
        details += '\n Expected Start Date: ' + new Date(startDate).toDateString();
      } else if (!startDate) {
        details += '\n Expected Start Date: ' + NO_DATA;
      }
      return details;
    } else if (reason === 'Available for Assignment') {
      if (comment === 'Missing' || !comment) {
        return NO_DATA;
      }
      return comment;
    } else if (reason === 'Client Strategic Bench') {
      let details = '';
      if (!!expectedClient) {
        details += 'Client: ' + expectedClient;
      } else if (!expectedClient) {
        details += 'Client: ' + NO_DATA;
      }
      if (!!startDate) {
        details += '\n Current Project Start date: ' + new Date(startDate).toDateString();
      } else if (!startDate) {
        details += '\n Current Project Start date: ' + NO_DATA;
      }
      return details;
    }
  }

}
