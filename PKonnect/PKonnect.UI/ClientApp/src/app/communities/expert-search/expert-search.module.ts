import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertSearchComponent } from './expert-search/expert-search.component';
import { EmployeeSearchFilterComponent } from './employee-search-filter/employee-search-filter.component';
import { EmployeeSearchResultsComponent } from './employee-search-results/employee-search-results.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {EmployeeModule} from 'src/app/shared/employee/employee.module';

const expertSearchRoutes: Routes = [
  {path: '', component: ExpertSearchComponent}
];

@NgModule({
  declarations: [ExpertSearchComponent, EmployeeSearchFilterComponent, EmployeeSearchResultsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    EmployeeModule,
    RouterModule.forChild(expertSearchRoutes)
  ]
})
export class ExpertSearchModule { }
