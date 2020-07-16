import { Component, Input, OnChanges } from '@angular/core';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-industry',
  templateUrl: './employee-industry.component.html',
  styleUrls: ['./employee-industry.component.scss']
})
export class EmployeeIndustryComponent implements OnChanges {

  @Input() employeeInfoDetails: any;
  public industries = [];
  public faCheck = faCheck;

  constructor() { }

  ngOnChanges() {
    this.industries = [];
    this.employeeInfoDetails.resourceAssignments.map(project => {
      const industryName = project.projectMaster.account.industryNavigation.industryName;
      if (!!industryName && this.industries.includes(industryName) === false && industryName !== 'Missing') {
        this.industries.push(industryName);
      }
    });
  }

}
