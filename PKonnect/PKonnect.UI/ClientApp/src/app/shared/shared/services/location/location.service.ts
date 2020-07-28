import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public location = new BehaviorSubject<string>(undefined);
  public employeeId = new BehaviorSubject<string>(undefined);

  get getLocation() {
    return this.location.asObservable();
  }

  get getEmployeeId() {
    return this.employeeId.asObservable();
  }

  constructor(private rest: RestService,
              private authSvc: AuthService) { }

  getLocationByEmail() {
    const getEmployeesUrl = `${environment.communitiesApi}/resources?$filter=primaryEmailAddress%20eq%20%27${this.authSvc.getUserDetails().email}%27`;
    this.rest.httpGet(getEmployeesUrl).subscribe(
      (data) => {
        if (data.length >= 0) {
          this.location.next(data[0].country);
          this.employeeId.next(data[0].employeeId);
        }
      },
      (error: Error) => {
        console.error(error);
      }
    );
  }

}
