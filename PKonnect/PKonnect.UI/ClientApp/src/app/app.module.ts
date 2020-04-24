import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';

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
      tenant: '5786743f-b4c4-4f8e-978e-95d7ff2aef9d',
      clientId: '870244e3-2770-4ab1-84f3-fb91d35111e5',
      redirectUri: 'http://localhost:4200/',
      // redirectUri: 'https://pkonnectui.azurewebsites.net/',
      //endpoints: {
      //  'api application url': 'api application client id', // this is for feteching the access token  
      //},
      navigateToLoginRequestUrl: false
      //cacheLocation: '<localStorage / sessionStorage>',
      //postLogoutRedirectUri: 'URI on which you want to redirect user after logout',
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
