import { Component, OnInit } from '@angular/core';
import { AmplitudeService } from './shared/shared/services/amplitude/amplitude.service';
import { AmplitudeEvent } from './models/amplitudeEvents.enum';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pk-connections';

  constructor(private amplitudeSvc: AmplitudeService,
              private msalService: MsalService) {

  }
  ngOnInit() {
    this.amplitudeSvc.initilize();
    this.amplitudeSvc.setEvent(AmplitudeEvent.NEW_SESSION);
  }

}
