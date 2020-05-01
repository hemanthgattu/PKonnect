import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-search-results',
  templateUrl: './employee-search-results.component.html',
  styleUrls: ['./employee-search-results.component.scss']
})
export class EmployeeSearchResultsComponent implements OnInit {

  @Output() moreEmployees = new EventEmitter();
  public employeeSearchResults = [];
  public employeeSearchResultsCount = 0;
  public faFilter = faFilter;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set employeeSearchResult(searchResult: any) {
    if (!!searchResult) {
      if (!searchResult.newData) {
        this.employeeSearchResults = this.employeeSearchResults.concat(searchResult.employeeSkillDetails);
      } else {
        this.employeeSearchResults = searchResult.employeeSkillDetails;
      }
      this.employeeSearchResultsCount = searchResult.recordCount;
    }
  }

  viewMore() {
    console.log('Get more employees - employee cards');
    this.moreEmployees.emit();
  }

}
