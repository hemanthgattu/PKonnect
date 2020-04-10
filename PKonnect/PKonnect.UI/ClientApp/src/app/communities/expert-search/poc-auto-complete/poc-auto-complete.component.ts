import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';

@Component({
  selector: 'app-poc-auto-complete',
  templateUrl: './poc-auto-complete.component.html',
  styleUrls: ['./poc-auto-complete.component.scss']
})
export class PocAutoCompleteComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  selectedSkills = [];

  constructor(private rest: RestService) {}

  ngOnInit(): void {
    // get skills
    this.getAllSkills();
    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue) ? option : '');
  }

  public log(value: string) {
    if (!!value && !this.selectedSkills.includes(value) && this.selectedSkills.length < 5) {
      this.selectedSkills.push(value);
      console.log(this.selectedSkills);
    }
  }

  getAllSkills() {
    this.rest.httpGet(`https://pkwebapi.azurewebsites.net/api/Skills`).subscribe(
        (data) => {
          this.options = data.map((skill) => skill.textName);
        },
        (error) => console.log(error)
      );
  }

  /*
  filterSkills(value: string) {
      console.log(value);
      this.rest.httpGet(`https://pkwebapi.azurewebsites.net/odata/Skills?$filter=contains(TextName,'${value}') eq true`).subscribe(
        (data) => {
          this.options = data.value.map((skill) => skill.TextName);
          console.log(this.options);
        },
        (error) => console.log(error)
      );
  }
  */
}
