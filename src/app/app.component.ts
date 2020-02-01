import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PermitService } from './services/permit.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any[];
  userName: any;
  image: any = "../assets/images/user.svg";
  permits;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    permitService: PermitService) {
    this.permits = permitService.getPermitsMap();
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
    let profileInfo = JSON.parse(sessionStorage.getItem('profileInformation'));
    if (profileInfo && profileInfo.image) {
      this.image = profileInfo.image;
    }
  }

  sideMenu() {
    this.navigate = [];
    if (this.permits["CONTENT_VIEW"]) {
      this.navigate.push({
        title: "Documentos y Enlaces",
        url: "/content-management",
        icon: "document"
      })
    }
    if (this.permits["CREATE_EVENTS"] || this.permits["CONSULT_EVENTS"]) {
      this.navigate.push({
        title: "Eventos",
        children: []
      });

      if (this.permits["CREATE_EVENTS"]) {
        this.navigate[1].children.push(
          {
            title: "Administración de Eventos",
            url: "events/event-management",
            icon: "clipboard"
          }
        )
      }
      if (this.permits["CONSULT_EVENTS"]) {
        this.navigate[1].children.push(
          {
            title: "Listado de Eventos",
            url: "events/list-events",
            icon: "calendar"
          }
        )
        this.navigate[1].children.push(
          {
            title: "Mis eventos",
            url: "events/user-events",
            icon: "checkbox-outline"
          }
        )
      }
    }

    if (this.permits["NEWS_DOWNLOAD"]) {
      this.navigate.push({
        title: "Noticias",
        url: "/news",
        icon: "book"
      })
    }
    if (this.permits["CREATE_MILK_REQUEST"] || this.permits["ASOCIATE_MILK_REQUEST"] || this.permits["TRACKING"] || this.permits["TRACKING_POINTS"]) {
      this.navigate.push({
        title: "Recoleccion de Leche",
        children: []
      });

      if (this.permits["CREATE_MILK_REQUEST"]) {
        this.navigate[3].children.push(
          {
            title: "Formulario Recolección",
            url: "milk-colection/register-colection",
            icon: "information-circle-outline"
          }
        )
        this.navigate[3].children.push(
          {
            title: "Estado de Solicitud",
            url: "milk-colection/farmer-request",
            icon: "help"
          }
        )
      }
      if (this.permits["ASOCIATE_MILK_REQUEST"]) {
        this.navigate[3].children.push(
          {
            title: "Solicitudes de recolección",
            url: "milk-colection/request-list",
            icon: "pricetags"
          })
      }
      if (this.permits["TRACKING"]) {
        this.navigate[3].children.push({
          title: "Ubicacion Recolector",
          url: "milk-colection/tracking",
          icon: "compass"
        })
      }
      if (this.permits["TRACKING_POINTS"]) {
        this.navigate[3].children.push({
          title: "Ruta de Recolección",
          url: "/collection-points",
          icon: "map"
        })
      }
    }
  }
}
