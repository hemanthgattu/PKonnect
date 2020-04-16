import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertSearchComponent } from './expert-search/expert-search.component';
import { EmployeeSearchFilterComponent } from './employee-search-filter/employee-search-filter.component';
import { EmployeeSearchResultsComponent } from './employee-search-results/employee-search-results.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { EmployeeModule } from 'src/app/shared/employee/employee.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchSkillInputComponent } from './search-form/search-skill-input/search-skill-input.component';
import { SearchNameInputComponent } from './search-form/search-name-input/search-name-input.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';


const expertSearchRoutes: Routes = [
  { path: '', component: ExpertSearchComponent }
];

@NgModule({
  declarations: [
    ExpertSearchComponent,
    EmployeeSearchFilterComponent,
    EmployeeSearchResultsComponent,
    SearchSkillInputComponent,
    SearchNameInputComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    EmployeeModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    MatTooltipModule,
    EmojiModule,
    RouterModule.forChild(expertSearchRoutes)
  ]
})
export class ExpertSearchModule { }
