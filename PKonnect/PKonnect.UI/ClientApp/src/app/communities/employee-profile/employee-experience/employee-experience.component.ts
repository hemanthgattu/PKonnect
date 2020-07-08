import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';

@Component({
  selector: 'app-employee-experience',
  templateUrl: './employee-experience.component.html',
  styleUrls: ['./employee-experience.component.scss']
})
export class EmployeeExperienceComponent implements OnChanges {

  public faCalendar = faCalendar;
  public faMapMarkerAlt = faMapMarkerAlt;
  public faUserCircle = faUserCircle;
  public projects: any[];
  public certifications: string[];
  public description: string;

  @Input() employeeExperienceDetails: any;

  constructor(private rest: RestService) { }

  ngOnChanges() {
    this.projects = this.employeeExperienceDetails.resourceAssignments;
    this.certifications = this.employeeExperienceDetails.resourceCertifications;
    this.getEmployeeDescription();
  }

  isActive(endDate: string) {
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth();
    const nowDt = new Date().getDate();
    // console.log('now ' + nowYear + ' ' + nowMonth + ' ' + nowDt);
    const endISODate = new Date(endDate);
    const endYear = endISODate.getFullYear();
    const endMonth = endISODate.getMonth();
    const endDt = endISODate.getDate();
    // console.log('now ' + endYear + ' ' + endMonth + ' ' + endDt);
    if (endDate === null ) {
      return true;
    } else if (endYear > nowYear) {
      return true;
    } else if ( endYear < nowYear) {
      return false;
    } else {
      if (endMonth > nowMonth) {
        return true;
      } else if (endMonth < nowMonth) {
        return false;
      } else {
        if (endDt > nowDt) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  getEmployeeDescription() {
    // console.log(this.employeeExperienceDetails.roleId);
    const roleId = this.employeeExperienceDetails.roleId;
    const urlRole = `https://communities-dev.pkglobal.com/api/api/Roles/${roleId}`;
    this.rest.httpGet(urlRole).subscribe(
      (data) => {
        // console.log(data);
        this.description = data.roleDescription;
      },
      (error) => {
        console.log(error);
      }
    );
    return 'Hellow';
  }
}
