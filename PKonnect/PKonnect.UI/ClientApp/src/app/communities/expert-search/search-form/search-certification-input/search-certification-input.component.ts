import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-certification-input',
  templateUrl: './search-certification-input.component.html',
  styleUrls: ['./search-certification-input.component.scss']
})
export class SearchCertificationInputComponent implements OnInit {

  public certControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  emptyCert() {
    this.certControl.setValue(undefined);
  }

}
