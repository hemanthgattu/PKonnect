import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {} from './communities/expert-search/expert-search.module'

const routes: Routes = [
  {path: 'dep-search', loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule) },
  {path: 'search', loadChildren: () => import('./communities/expert-search/expert-search.module').then(m => m.ExpertSearchModule) },
  {path: '**',  redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
