import { Component, OnInit, Input } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-search-results',
  templateUrl: './employee-search-results.component.html',
  styleUrls: ['./employee-search-results.component.scss']
})
export class EmployeeSearchResultsComponent implements OnInit {

  public employeeSearchResults: any;
  public faFilter = faFilter;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set employeeSearchResult(searchResult: any) {
    this.employeeSearchResults = searchResult;
  }

}
