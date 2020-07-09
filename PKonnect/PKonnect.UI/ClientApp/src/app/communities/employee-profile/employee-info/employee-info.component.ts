import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faEnvelope, faCalendar, faIdCard, faUserCircle, faNewspaper, faUser, faComment } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faMapMarkerAlt, faPassport, faLuggageCart, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnChanges {

  public faCheckCircle = faCheckCircle;
  public faEnvelope = faEnvelope;
  public faCalendar = faCalendar;
  public faMapMarkerAlt = faMapMarkerAlt;
  public faIdCard = faIdCard;
  public faUserCircle = faUserCircle;
  public faNewspaper = faNewspaper;
  public faUser = faUser;
  public faComment = faComment;
  public faPassport = faPassport;
  public faLuggageCart = faLuggageCart;
  public faPlaneDeparture = faPlaneDeparture;

  @Input() employeeInfoDetails: any;
  public availValue: string;

  constructor() { }

  ngOnChanges() {
    if (this.employeeInfoDetails.resourceStatus === 'On Bench') {
      this.availValue = this.employeeInfoDetails.onBenchReason;
    } else if (this.employeeInfoDetails.resourceStatus === 'On Project') {
      this.availValue = 'On Project';
    }
  }

}
