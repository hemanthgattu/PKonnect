import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import { SearchSkillInputComponent } from '../search-form/search-skill-input/search-skill-input.component';
import { EmployeeSearchFilterComponent } from '../employee-search-filter/employee-search-filter.component';

@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.scss']
})
export class ExpertSearchComponent implements OnInit {

  @ViewChild(EmployeeSearchFilterComponent) employeeSearchFilterComponent: EmployeeSearchFilterComponent;
  public employeeSearchResult: any;

  constructor() { }

  ngOnInit(): void {
  }

  message(message: any): void {
    this.employeeSearchResult = message;
  }

  getMoreEmployees() {
    this.employeeSearchFilterComponent.getMoreEmployees();
  }

}
