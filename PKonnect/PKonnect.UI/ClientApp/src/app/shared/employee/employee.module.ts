import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchCardComponent } from './employee-search-card/employee-search-card.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EmployeeSearchCardComponent, EmployeeProfileComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatSnackBarModule,
    SharedModule
  ],
  exports: [EmployeeSearchCardComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    }
  ]
})
export class EmployeeModule { }
