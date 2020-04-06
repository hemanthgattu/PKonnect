import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchCardComponent } from './employee-search-card/employee-search-card.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';



@NgModule({
  declarations: [EmployeeSearchCardComponent, EmployeeProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [EmployeeSearchCardComponent]
})
export class EmployeeModule { }
