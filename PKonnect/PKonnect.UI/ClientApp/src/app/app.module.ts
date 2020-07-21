import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { environment } from './../environments/environment';
import { MsalModule, MSAL_CONFIG, MsalAngularConfiguration, MSAL_CONFIG_ANGULAR, MsalService } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { NgxHotjarModule, NgxHotjarRouterModule } from 'ngx-hotjar';

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      validateAuthority: true,
      redirectUri: environment.redirectUri,
      postLogoutRedirectUri: environment.redirectUri,
      navigateToLoginRequestUrl: true
    },
    cache: {
      storeAuthStateInCookie: false,
    }
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: false
  };
}

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
    MsalModule,
    NgxHotjarModule.forRoot('1909826'),
    NgxHotjarRouterModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
  ]
})
export class AppModule { }
