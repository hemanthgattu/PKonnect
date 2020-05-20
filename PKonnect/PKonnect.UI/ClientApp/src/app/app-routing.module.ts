import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./communities/expert-search/expert-search.module').then(m => m.ExpertSearchModule)
    , pathMatch: 'full', canActivate: [AuthenticationGuard]
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./communities/employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule)
  //   , pathMatch: 'full', canActivate: [AuthenticationGuard]
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
  providers: [AuthenticationGuard]
})
export class AppRoutingModule { }
