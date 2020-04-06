import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListingComponent } from './search-listing/search-listing.component';
import { SearchComponent } from './search/search.component';
import { ListingComponent } from './listing/listing.component';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';

const listingRoutes: Routes = [
  {path: '', component: SearchListingComponent}
];


@NgModule({
  declarations: [SearchListingComponent, SearchComponent, ListingComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    RouterModule.forChild(listingRoutes)
  ],
  exports: [
    SearchListingComponent
  ]
})
export class ListingModule { }
