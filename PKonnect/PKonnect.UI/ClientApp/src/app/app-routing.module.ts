import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./communities/expert-search/expert-search.module').then(m => m.ExpertSearchModule)
    , pathMatch: 'full', canActivate: [ MsalGuard ]
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./communities/employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule)
  //   , pathMatch: 'full', canActivate: [ MsalGuard ]
  // },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
