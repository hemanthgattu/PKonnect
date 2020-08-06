import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { startWith, map, debounce, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from '../../../../../environments/environment';
import { SubSink } from 'subsink';
import { ESessionKeys } from 'src/app/shared/shared/constants/sessionKeys.interface';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';

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

  constructor(private rest: RestService, private sessionService: SessionService) { }

  ngOnInit(): void {
    // get all employees
    this.getAllEmployeeNames();

    this.myControl = new FormControl();

    // filter from options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!!value && value.length > 2) {
          return this._filter(value);
        }})
    );

    const sessionNameValue = this.sessionService.getItem(ESessionKeys.SEARCH_ITEMS_NAME);
    if (!!sessionNameValue) {
      this.myControl.setValue(sessionNameValue);
      this.searchNameEvent.emit(sessionNameValue);
    }
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
    if (!!value) {
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_NAME, value);
    }
    this.searchNameEvent.emit(value);
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      this.log(undefined);
      this.sessionService.deleteItem(ESessionKeys.SEARCH_ITEMS_NAME);
    } else {
      this.log(event.target.value);
    }
  }

  getAllEmployeeNames() {
    this.subs.add(this.rest.httpGet(`${environment.communitiesApi}/resources?$select=fullName&$filter=Category ne 'In-House'`).subscribe(
      (data) => {
        this.options = data.map((employee) => employee.FullName);
      },
      (error: Error) => console.error(error)
    ));
  }

  emptyName() {
    this.myControl.reset();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
