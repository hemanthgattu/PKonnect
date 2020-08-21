import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-employee-certs',
  templateUrl: './employee-certs.component.html',
  styleUrls: ['./employee-certs.component.scss']
})
export class EmployeeCertsComponent implements OnChanges {

  public certifications: string[];
  @Input() employeeExperienceDetails: any;

  constructor() { }

  ngOnChanges() {
    this.certifications = this.employeeExperienceDetails.resourceCertifications;
  }

}
