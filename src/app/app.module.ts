import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { GoogleMaps } from "@ionic-native/google-maps";

//Components and modules
import { LoginPageModule } from './auth/login/login.module';
import { NavBarModule } from './components/nav-bar/nav-bar.module';
import { AlertPopupPageModule } from './alert-popup/alert-popup.module';
import { NewsPageModule } from './news/news.module';
import { NewsInspectionPageModule } from './components/news/news-inspection/news-inspection.module';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { UserProfilePageModule } from './user-profile/user-profile.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    LoginPageModule,
    UserProfilePageModule,
    AlertPopupPageModule,
    NewsPageModule,
    NavBarModule,
    NewsInspectionPageModule,
    PdfViewerModule,
    HttpClientModule,
    BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule],
  providers: [
    AuthService,
    HttpClientModule,
    StatusBar,
    Geolocation,
    SplashScreen,
    GoogleMaps,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'apiUrl',
      useValue: environment.url
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
