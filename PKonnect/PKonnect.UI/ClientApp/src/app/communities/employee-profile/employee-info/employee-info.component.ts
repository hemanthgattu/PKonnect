import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faEnvelope, faCalendar, faIdCard, faUserCircle, faNewspaper, faUser, faComment, faAddressCard} from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faMapMarkerAlt, faPassport, faLuggageCart, faPlaneDeparture , faPhone} from '@fortawesome/free-solid-svg-icons';
import { faSalesforce } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnChanges, OnInit {

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
  public faAddressCard = faAddressCard;
  public faSalesforce = faSalesforce;
  public faPhone = faPhone;

  @Input() employeeInfoDetails: any;
  public availValue: string;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.employeeInfoDetails.resourceStatus === 'On Bench') {
      this.availValue = this.employeeInfoDetails.onBenchReason;
    } else if (this.employeeInfoDetails.resourceStatus === 'On Project') {
      this.availValue = 'On Project';
    }
  }

}
