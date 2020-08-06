import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SessionService } from 'src/app/shared/shared/services/session/session.service';
import { ESessionKeys } from 'src/app/shared/shared/constants/sessionKeys.interface';

@Component({
  selector: 'app-search-avail-input',
  templateUrl: './search-avail-input.component.html',
  styleUrls: ['./search-avail-input.component.scss']
})
export class SearchAvailInputComponent implements OnInit {

  @Output() searchAvailEvent = new EventEmitter();
  public availabilityControl = new FormControl();
  public availabilityOptions = [
    {
      displayName: 'On Bench',
      availabilityValue: 'On Bench'
    },
    {
      displayName: 'On Project',
      availabilityValue: 'On Project'
    }
  ];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    const sessionStatusValue = this.sessionService.getItem(ESessionKeys.SEARCH_ITEMS_STATUS);
    if (!!sessionStatusValue) {
      this.availabilityControl.setValue(sessionStatusValue);
      this.searchAvailEvent.emit(sessionStatusValue);
    }
  }

  public log(value: string) {
    if (value === this.availabilityOptions[0].displayName) {
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_STATUS, this.availabilityOptions[0].availabilityValue);
      this.searchAvailEvent.emit(this.availabilityOptions[0].availabilityValue);
    } else if (value === this.availabilityOptions[1].displayName) {
      this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_STATUS, this.availabilityOptions[1].availabilityValue);
      this.searchAvailEvent.emit(this.availabilityOptions[1].availabilityValue);
    } else {
      if (!!value) {
        this.sessionService.setItem(ESessionKeys.SEARCH_ITEMS_STATUS, value);
      }
      this.searchAvailEvent.emit(value);
    }
  }

  handleEmptyInput(event: any, key: string){
    if (event.target.value === '') {
      this.log(undefined);
      this.sessionService.deleteItem(ESessionKeys.SEARCH_ITEMS_STATUS);
    }
  }

  emptyAvail() {
    this.availabilityControl.setValue(undefined);
  }

}
