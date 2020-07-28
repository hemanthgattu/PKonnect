import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faEnvelope, faCalendar, faIdCard, faUserCircle, faNewspaper, faUser, faComment, faAddressCard} from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faMapMarkerAlt, faPassport, faLuggageCart, faPlaneDeparture , faPhone, faStickyNote} from '@fortawesome/free-solid-svg-icons';
import { faSalesforce } from '@fortawesome/free-brands-svg-icons';
import { SharedMethodsService } from 'src/app/shared/shared/services/shared-methods/shared-methods.service';

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
  public faStickyNote = faStickyNote;
  public projectComments: string;

  @Input() employeeInfoDetails: any;
  public availValue: string;

  constructor(private sharedService: SharedMethodsService) { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.employeeInfoDetails.resourceStatus === 'On Bench') {
      this.availValue = this.employeeInfoDetails.onBenchReason;
    } else if (this.employeeInfoDetails.resourceStatus === 'On Project') {
      this.availValue = 'On Project';
    }
    this.projectComments = this.sharedService.setEmployeeProjectComments(this.employeeInfoDetails.onBenchReason,
                            this.employeeInfoDetails.projectComments, this.employeeInfoDetails.expectedStartDate,
                            this.employeeInfoDetails.proposedCustomerForBenchResource);
  }

}
