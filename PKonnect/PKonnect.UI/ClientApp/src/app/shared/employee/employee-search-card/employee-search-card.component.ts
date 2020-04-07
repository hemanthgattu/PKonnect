import { Component, OnInit, Input } from '@angular/core';
import { faUserCircle, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-search-card',
  templateUrl: './employee-search-card.component.html',
  styleUrls: ['./employee-search-card.component.scss']
})
export class EmployeeSearchCardComponent implements OnInit {

  public employee: any;
  public faUserCircle = faUserCircle;
  public faTrophy = faTrophy;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set employeeData(employee: any) {
    this.employee = employee;
  }

}
