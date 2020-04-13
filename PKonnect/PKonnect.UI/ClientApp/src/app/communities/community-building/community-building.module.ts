import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityBuildingComponent } from './community-building/community-building.component';
import { Routes, RouterModule } from '@angular/router';

const communityBuildingRoutes: Routes = [
  {path: '', component: CommunityBuildingComponent}
];

@NgModule({
  declarations: [CommunityBuildingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(communityBuildingRoutes)
  ]
})
export class CommunityBuildingModule { }
