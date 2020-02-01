import { Injectable } from '@angular/core';
import { Services } from './services.service';
import { AlertController } from '@ionic/angular';
import { TranslateUtilService } from './translate.service';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService extends Services {

  constructor(
    private translateService: TranslateUtilService,
    public alertController: AlertController) {
    super();
  }

  async presentError(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: this.translateService._translate('codeError.' + message),
      buttons: buttons
    });

    await alert.present();
  }
  async presentSuccess(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: this.translateService._translate('codeSuccess.' + message),
      buttons: buttons
    });

    await alert.present();
  }



}