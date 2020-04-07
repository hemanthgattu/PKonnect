import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchCardComponent } from './employee-search-card/employee-search-card.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [EmployeeSearchCardComponent, EmployeeProfileComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [EmployeeSearchCardComponent]
})
export class EmployeeModule { }
