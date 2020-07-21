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
  public employeePrimarySkills: any[];
  public employeeSecondarySkills: any[];
  public displayEmployeeSkillCount = 5;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public displaySecondarySkill = false;

  constructor() { }

  ngOnChanges() {
    this.employeePrimarySkills = this.employeeSkillDetails.filter((skill: any) => {
      if (skill.bestFitSkill) {
        return skill;
      }
    });
    this.employeeSkills = this.employeePrimarySkills.slice(0, this.displayEmployeeSkillCount);
    this.employeeSecondarySkills = this.employeeSkillDetails.filter((skill: any) => {
      if (!skill.bestFitSkill) {
        return skill;
      }
    });
  }

  showMoreSkills(): void {
    this.employeeSkills = this.employeePrimarySkills;
    this.displaySecondarySkill = true;
  }

  showLessSkills(): void {
    this.employeeSkills = this.employeePrimarySkills.slice(0, this.displayEmployeeSkillCount);
    this.displaySecondarySkill = false;
  }

}
