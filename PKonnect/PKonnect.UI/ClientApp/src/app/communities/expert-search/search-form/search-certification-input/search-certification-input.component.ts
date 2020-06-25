import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    this.getAllCertifications();
    this.certControl = new FormControl();
    this.filteredOptions = this.certControl.valueChanges.pipe(
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

  getAllCertifications() {
    this.subs.add(this.rest.httpGet(`${environment.communitiesApi}/certifications?$select=certificationName`).subscribe(
      (data) => {
        this.options = data.map((certification) => certification.CertificationName);
      },
      (error: Error) => console.log(error)
    ));
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      this.log(undefined);
    } else {
      console.log('Handled Cert : ' + event.target.value);
      this.log(event.target.value);
    }
  }

  public log(value: string) {
    this.searchCertEvent.emit(value);
  }

  emptyCert() {
    this.certControl.setValue(undefined);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
