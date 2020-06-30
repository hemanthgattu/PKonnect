import { Component, OnInit, Input } from '@angular/core';
import { faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-experience',
  templateUrl: './employee-experience.component.html',
  styleUrls: ['./employee-experience.component.scss']
})
export class EmployeeExperienceComponent implements OnInit {

  public faCalendar = faCalendar;
  public faMapMarkerAlt = faMapMarkerAlt;
  public faUserCircle = faUserCircle;

  public projects = [
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: true,
      role: 'Developer - Angular'
    },
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: false,
      role: 'Developer - Angular'
    },
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: false,
      role: 'Developer - Angular'
    },
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: false,
      role: 'Developer - Angular'
    }
  ];

  certifications: string[];

  @Input() employeeExperienceDetails: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.employeeExperienceDetails);
    this.certifications = this.employeeExperienceDetails.resourceCertifications;
  }

}
