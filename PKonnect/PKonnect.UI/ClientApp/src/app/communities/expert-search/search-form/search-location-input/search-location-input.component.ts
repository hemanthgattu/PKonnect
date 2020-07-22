import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/shared/shared/services/location/location.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-search-location-input',
  templateUrl: './search-location-input.component.html',
  styleUrls: ['./search-location-input.component.scss']
})
export class SearchLocationInputComponent implements OnInit, OnDestroy{

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

  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
    this.subs.sink = this.locationService.getLocation.subscribe(
      (data: string) => {
        this.locationControl.setValue(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setLocation(option: string) {
    this.searchLocationEvent.emit(option);
  }

  handleEmptyInput(event: any){
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
