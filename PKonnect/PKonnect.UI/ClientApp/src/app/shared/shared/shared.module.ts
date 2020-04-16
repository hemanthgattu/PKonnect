import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/rest/rest.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [NavBarComponent, TruncatePipe],
  imports: [
    CommonModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [NavBarComponent, TruncatePipe],
  providers: [ RestService ]
})
export class SharedModule { }
