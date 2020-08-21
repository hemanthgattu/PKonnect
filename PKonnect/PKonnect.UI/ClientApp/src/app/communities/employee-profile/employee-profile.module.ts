import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { EmployeeHeroComponent } from './employee-hero/employee-hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { EmployeeExperienceComponent } from './employee-experience/employee-experience.component';
import { EmployeeSkillsComponent } from './employee-skills/employee-skills.component';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { EmployeeIndustryComponent } from './employee-industry/employee-industry.component';
import { EmployeeSkillDetailsComponent } from './employee-skill-details/employee-skill-details.component';
import { EmployeeCertsComponent } from './employee-certs/employee-certs.component';

const employeeProfileRoutes: Routes = [
  { path: '', component: EmployeeProfileComponent }
];

@NgModule({
  declarations: [
    EmployeeProfileComponent,
    EmployeeHeroComponent,
    EmployeeInfoComponent,
    EmployeeExperienceComponent,
    EmployeeSkillsComponent,
    EmployeeIndustryComponent,
    EmployeeSkillDetailsComponent,
    EmployeeCertsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatSnackBarModule,
    RouterModule.forChild(employeeProfileRoutes)
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        showDelay: 500,
        hideDelay: 0,
        touchendHideDelay: 0,
        touchGestures: 'off'
      }
    }
  ]
})
export class EmployeeProfileModule { }
