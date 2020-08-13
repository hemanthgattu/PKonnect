import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDefinationComponent } from './role-defination/role-defination.component';
import { Routes, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


const expertSearchRoutes: Routes = [
  { path: '', component: RoleDefinationComponent }
];

@NgModule({
  declarations: [RoleDefinationComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    RouterModule.forChild(expertSearchRoutes)
  ]
})
export class RoleDefinationModule { }
