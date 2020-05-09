import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-location-input',
  templateUrl: './search-location-input.component.html',
  styleUrls: ['./search-location-input.component.scss']
})
export class SearchLocationInputComponent {

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

}
