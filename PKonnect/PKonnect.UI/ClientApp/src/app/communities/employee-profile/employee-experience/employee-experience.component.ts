import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-experience',
  templateUrl: './employee-experience.component.html',
  styleUrls: ['./employee-experience.component.scss']
})
export class EmployeeExperienceComponent implements OnInit {

  public faCalendar = faCalendar;
  public faMapMarkerAlt = faMapMarkerAlt;
  public projects = [
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: true,
    },
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: false,
    },
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: false,
    },
    {
      name: 'Puget Sound Energy',
      description: 'The Value of Holistic Optimization Program',
      city: 'Seattle',
      state: 'WA',
      endDate: '01/2019',
      isActive: false,
    }
  ];

  certifications = [
    'Oracle Certified Associate Java Programmer (OCAJP) [Java SE 8 Programmer I]',
    'Oracle Certified Associate Java Programmer (OCAJP) [Java SE 11 Programmer]'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
