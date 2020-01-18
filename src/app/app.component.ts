import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  click(){
    console.log("click")
    this.splashScreen.show();
  }

  sideMenu() {
    this.navigate = [
      {
        title: "Noticias",
        url: "/news",
        icon: "book"
      },
      {
        title: "Documentos y Enlaces",
        url: "/content-management",
        icon: "document"
      },
      {
        title: "Recolección de Leche",
        children:[
          {
            title: "Formulario Recolección",
            url: "",
            icon: "information-circle-outline"
          },
          {
            title: "Estado de Solicitud",
            url: "",
            icon: "help"
          },
          {
            title: "Solicitudes de recolección",
            url: "",
            icon: "pricetags"
          },
          {
            title: "Ubicacion Recolector",
            url: "",
            icon: "compass"
          },
          {
            title: "Ruta de Recolección",
            url: "/collection-points",
            icon: "map"
          }
        ]
      },
    ]
  }
}
