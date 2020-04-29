import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { EmployeeHeroComponent } from './employee-hero/employee-hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const employeeProfileRoutes: Routes = [
  { path: '', component: EmployeeProfileComponent }
];

@NgModule({
  declarations: [EmployeeProfileComponent, EmployeeHeroComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule.forChild(employeeProfileRoutes)
  ]
})
export class EmployeeProfileModule { }
