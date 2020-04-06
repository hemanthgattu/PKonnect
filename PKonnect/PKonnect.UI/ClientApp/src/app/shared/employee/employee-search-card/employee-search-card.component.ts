import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-search-card',
  templateUrl: './employee-search-card.component.html',
  styleUrls: ['./employee-search-card.component.scss']
})
export class EmployeeSearchCardComponent implements OnInit {

  public employee: any;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set employeeData(employee: any) {
    this.employee = employee;
  }

}
