import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-avail-input',
  templateUrl: './search-avail-input.component.html',
  styleUrls: ['./search-avail-input.component.scss']
})
export class SearchAvailInputComponent {

  @Output() searchAvailEvent = new EventEmitter();
  public availabilityControl = new FormControl();
  public availabilityOptions = [
    {
      displayName: 'Available',
      availabilityValue: 'On Bench'
    },
    {
      displayName: 'On Project',
      availabilityValue: 'On Project'
    }
  ];

  public log(value: string) {
    if (value === this.availabilityOptions[0].displayName) {
      this.searchAvailEvent.emit(this.availabilityOptions[0].availabilityValue);
    } else if (value === this.availabilityOptions[1].displayName) {
      this.searchAvailEvent.emit(this.availabilityOptions[1].availabilityValue);
    } else {
      this.searchAvailEvent.emit(value);
    }
  }

  handleEmptyInput(event: any, key: string){
    if (event.target.value === '') {
      this.log(undefined);
    }
  }

  emptyAvail() {
    this.availabilityControl.setValue(undefined);
  }

}
