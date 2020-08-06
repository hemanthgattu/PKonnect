import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/shared/shared/services/location/location.service';
import { SubSink } from 'subsink';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';
import { ESessionKeys, ESessionValues } from 'src/app/shared/shared/constants/sessionKeys.interface';

@Component({
  selector: 'app-search-location-input',
  templateUrl: './search-location-input.component.html',
  styleUrls: ['./search-location-input.component.scss']
})
export class SearchLocationInputComponent implements OnInit, OnDestroy {

  @Output() searchLocationEvent = new EventEmitter();
  public locationControl = new FormControl();
  public locationOptions: string[] = [
    'USA',
    'IND',
    'ARG',
    'MEX'
  ];

  public locationFlags = {
    USA: { id: 'flag-us' },
    IND: { id: 'flag-in' },
    ARG: { id: 'flag-ar' },
    MEX: { id: 'flag-mx' }
  };
  private subs = new SubSink();

  constructor(private locationService: LocationService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    const sessionLocationValue = this.sessionService.getItem(ESessionKeys.SEARCH_ITEMS_LOCATION);
    if (!!sessionLocationValue) {
      this.locationControl.setValue(sessionLocationValue);
      this.searchLocationEvent.emit(sessionLocationValue);
    } else if (this.sessionService.getItem(ESessionKeys.SEARCH) !== ESessionValues.SEARCH) {
      this.subs.sink = this.locationService.getLocation.subscribe(
        (data: string) => {
          this.locationControl.setValue(data);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  setLocation(option: string) {
    if (!!option) {
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_LOCATION, option);
    } else {
      this.sessionService.deleteItem(ESessionKeys.SEARCH_ITEMS_LOCATION);
    }
    this.searchLocationEvent.emit(option);
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      this.setLocation(undefined);
    }
  }

  emptyLocation() {
    this.locationControl.setValue(undefined);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
