import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-skills',
  templateUrl: './employee-skills.component.html',
  styleUrls: ['./employee-skills.component.scss']
})
export class EmployeeSkillsComponent implements OnInit {

  public skills = [
    {
      name: 'Java',
      skillRating: 4
    },
    {
      name: 'JavaScript',
      skillRating: 2
    },
    {
      name: 'Sprint',
      skillRating: 5
    },
    {
      name: 'Angular',
      skillRating: 1
    },
    {
      name: 'React',
      skillRating: 5
    }
  ];
  @Input() employeeSkillDetails: any;

  constructor() { }

  ngOnInit(): void {
  }

}
