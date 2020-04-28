import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MsAdalAngular6Module.forRoot({
      tenant: environment.tenant,
      clientId: environment.clientId,
      redirectUri: environment.redirectUri,
      navigateToLoginRequestUrl: false
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
