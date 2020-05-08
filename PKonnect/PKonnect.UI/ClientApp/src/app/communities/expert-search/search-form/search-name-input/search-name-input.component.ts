import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../../environments/environment';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-search-name-input',
  templateUrl: './search-name-input.component.html',
  styleUrls: ['./search-name-input.component.scss']
})
export class SearchNameInputComponent implements OnInit, OnDestroy {

  @Output() public searchNameEvent = new EventEmitter();
  private subs = new SubSink();
  myControl: FormControl;
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  timeout = null;

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    // get all employees
    this.getAllEmployeeNames();

    this.myControl = new FormControl();

    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value) {
    if (!!value) {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => {
        if (!!option && option.toLowerCase().includes(filterValue)) {
          return option;
        }
      });
    }
  }

  public log(value: string) {
    console.log('Pushed name: ' + value);
    this.searchNameEvent.emit(value);
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      // console.log('empty input');
      this.log(undefined);
    } else {
      console.log('Handled Name : ' + event.target.value);
      this.log(event.target.value);
    }
  }

  getAllEmployeeNames() {
    this.subs.add(this.rest.httpGet(`${environment.communitiesApi}/Employees`).subscribe(
      (data) => {
        this.options = data.map((employee) => employee.fullName);
      },
      (error: Error) => console.log(error)
    ));
  }

  emptyName() {
    console.log(this.myControl.value);
    this.myControl.reset();
    console.log(this.myControl.value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
