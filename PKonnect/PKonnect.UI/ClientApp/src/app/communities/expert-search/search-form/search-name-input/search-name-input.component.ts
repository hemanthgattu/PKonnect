import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
@Component({
  selector: 'app-search-name-input',
  templateUrl: './search-name-input.component.html',
  styleUrls: ['./search-name-input.component.scss']
})
export class SearchNameInputComponent implements OnInit {

  @Output() public searchNameEvent = new EventEmitter();
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  timeout = null;

  constructor(private rest: RestService) {}

  ngOnInit(): void {
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
    if (!!value) {
      this.searchNameEvent.emit(value);
    }
  }

  filterName(value: string) {
      clearTimeout(this.timeout);
      if (!!value) {
        this.timeout = setTimeout(() => {
          this.rest.httpGet(`https://pkwebapi.azurewebsites.net/odata/Employees?$filter=contains(FullName,'${value}') eq true`).subscribe(
            (data) => {
              this.options = data.value.map((employee) => employee.FullName);
              if (!this.options.length) {
                this.log(value);
              }
            },
            (error) => console.log(error)
          );
        }, 500);
      }
  }

}
