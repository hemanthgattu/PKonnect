import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert-search',
  templateUrl: './expert-search.component.html',
  styleUrls: ['./expert-search.component.scss']
})
export class ExpertSearchComponent implements OnInit {

  public employeeSearchResult: any;

  constructor() { }

  ngOnInit(): void {
  }

  message(message: any): void {
    this.employeeSearchResult = message;
  }

}
