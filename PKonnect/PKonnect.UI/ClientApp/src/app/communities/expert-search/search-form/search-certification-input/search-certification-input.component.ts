import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ESessionKeys } from 'src/app/shared/shared/constants/sessionKeys.interface';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';

@Component({
  selector: 'app-search-certification-input',
  templateUrl: './search-certification-input.component.html',
  styleUrls: ['./search-certification-input.component.scss']
})
export class SearchCertificationInputComponent implements OnInit, OnDestroy {

  @Output() public searchCertEvent = new EventEmitter();
  public certControl = new FormControl();
  private subs = new SubSink();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private rest: RestService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getAllCertifications();
    this.certControl = new FormControl();
    this.filteredOptions = this.certControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!!value && value.length > 2) {
          return this._filter(value);
        }})
    );
    const sessionCertValue = this.sessionService.getItem(ESessionKeys.SEARCH_ITEMS_CERTS);
    if (!!sessionCertValue) {
      this.certControl.setValue(sessionCertValue);
      this.searchCertEvent.emit(sessionCertValue);
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

  getAllCertifications() {
    this.subs.add(this.rest.httpGet(`${environment.communitiesApi}/certifications?$select=certificationName`).subscribe(
      (data) => {
        this.options = data.map((certification) => certification.CertificationName);
      },
      (error: Error) => console.error(error)
    ));
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      this.log(undefined);
      this.sessionService.deleteItem(ESessionKeys.SEARCH_ITEMS_CERTS);
    } else {
      this.log(event.target.value);
    }
  }

  public log(value: string) {
    if (!!value) {
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_CERTS, value);
    }
    this.searchCertEvent.emit(value);
  }

  emptyCert() {
    this.certControl.setValue(undefined);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
