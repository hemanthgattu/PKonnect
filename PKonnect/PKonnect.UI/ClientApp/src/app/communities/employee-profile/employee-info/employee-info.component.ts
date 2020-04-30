import { Component, OnInit } from '@angular/core';
import { faEnvelope, faCalendar, faIdCard, faUserCircle, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {

  public faCheckCircle = faCheckCircle;
  public faEnvelope = faEnvelope;
  public faCalendar = faCalendar;
  public faMapMarkerAlt = faMapMarkerAlt;
  public faIdCard = faIdCard;
  public faUserCircle = faUserCircle;
  public faNewspaper = faNewspaper;

  constructor() { }

  ngOnInit(): void {
  }

}
