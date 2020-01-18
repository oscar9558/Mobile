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
  navigate: { title: string; url: string; icon: string; }[];
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
        title: "Mapas",
        url: "/collection-points",
        icon: "map"
      },
    ]
  }
}
