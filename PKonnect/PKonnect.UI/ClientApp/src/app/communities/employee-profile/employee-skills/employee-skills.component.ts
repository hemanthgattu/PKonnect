import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-skills',
  templateUrl: './employee-skills.component.html',
  styleUrls: ['./employee-skills.component.scss']
})
export class EmployeeSkillsComponent implements OnChanges {

  @Input() employeeSkillDetails: any;
  public employeeSkills: any[];
  public displayEmployeeSkillCount = 5;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;

  constructor() { }

  ngOnChanges() {
    this.employeeSkills = this.employeeSkillDetails.slice(0, this.displayEmployeeSkillCount);
  }

  showMoreSkills(): void {
    this.employeeSkills = this.employeeSkillDetails;
  }

  showLessSkills(): void {
    this.employeeSkills = this.employeeSkillDetails.slice(0, this.displayEmployeeSkillCount);
  }

}
