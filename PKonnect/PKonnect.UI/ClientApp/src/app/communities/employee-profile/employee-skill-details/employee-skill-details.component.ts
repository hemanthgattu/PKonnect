import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { SubSink } from 'subsink';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-skill-details',
  templateUrl: './employee-skill-details.component.html',
  styleUrls: ['./employee-skill-details.component.scss']
})
export class EmployeeSkillDetailsComponent implements OnChanges {

  @Input() employeeResourceId: any;
  public employeePrimarySkills = [];
  public employeeSecondarySkills = [];
  public displayEmployeeSecondarySkills = [];
  public displaySecondarySkillCount = 10;
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  private sub = new SubSink();

  constructor(private restService: RestService) { }

  ngOnChanges() {
    this.getDetailedSkills(this.employeeResourceId);
  }

  getDetailedSkills(id: number) {
    const URL = environment.communitiesApi + `/resourceskills/${id}`;
    this.sub.sink = this.restService.httpGet(URL).subscribe(
      (data) => {
        if (data.length > 0) {
          data.map(skill => {
            if (skill.bestFitSkill) {
              this.employeePrimarySkills.push(skill);
            } else if (!skill.bestFitSkill) {
              this.employeeSecondarySkills.push(skill);
            }
          });
        }
        this.showLessSecondarySkills();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  chunkArray(arr, chunkSize) {
    const array = arr;
    return [].concat.apply([],
      array.map((elem, i) => {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }

  showLessSecondarySkills() {
    this.displayEmployeeSecondarySkills = this.employeeSecondarySkills.slice(0, this.displaySecondarySkillCount);
    this.displayEmployeeSecondarySkills = this.chunkArray(this.displayEmployeeSecondarySkills, 2);
  }

  showMoreSecondarySkills() {
    this.displayEmployeeSecondarySkills = this.chunkArray(this.employeeSecondarySkills, 2);
  }

}
