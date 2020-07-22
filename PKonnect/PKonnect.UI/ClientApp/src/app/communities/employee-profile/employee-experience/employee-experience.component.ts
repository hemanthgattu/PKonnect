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
    this.projects = this.sortExperience(this.employeeExperienceDetails.resourceAssignments);
    // this.sortExperience(this.projects);
    this.certifications = this.employeeExperienceDetails.resourceCertifications;
    this.getEmployeeDescription();
  }

  sortExperience(input: any[]) {
    const sortedArr = input;
    for (let i = 0; i < input.length; i++) {
      if (!input[i].resourceEndDate) {
        sortedArr.unshift(sortedArr.splice(i, 1)[0]);
      }
    }
    return sortedArr;
  }

  isActive(endDate: string) {
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth();
    const nowDt = new Date().getDate();
    const endISODate = new Date(endDate);
    const endYear = endISODate.getFullYear();
    const endMonth = endISODate.getMonth();
    const endDt = endISODate.getDate();
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
    const roleId = this.employeeExperienceDetails.roleId;
    const urlRole = `https://communities-dev.pkglobal.com/api/api/Roles/${roleId}`;
    this.rest.httpGet(urlRole).subscribe(
      (data) => {
        this.description = data.roleDescription;
      },
      (error) => {
        console.error(error);
      }
    );
    return 'Hellow';
  }
}
