import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { MilkCollectionService } from 'src/app/services/milk-collection.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-milk-collection-traking',
  templateUrl: './milk-collection-traking.component.html',
  styleUrls: ['./milk-collection-traking.component.css']
})
export class MilkCollectionTrakingComponent implements OnInit {

  requestAssigned;
  zoom: number = 16;
  latitudeTrucker;
  longitudeTrucker;
  latitude = 50.083644;
  longitude = 14.430367;
  alertPopupComponent: any;

  constructor(
    private milkCollectionService: MilkCollectionService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.milkCollectionService.getRequest().subscribe(res => {
      this.requestAssigned = res;
      this.setCurrentLocation();
      this.getTrackerPosition();
    })
  }

  private getTrackerPosition() {
    const trackingInterval = interval(10000);
    trackingInterval.pipe(switchMap(() => this.milkCollectionService.findTruckerPosition(this.requestAssigned.trucker.username))).subscribe(res => {
      this.latitude = res.y;
      this.longitude = res.x;
    }, err => {
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'El conductor no tiene la ubicación activada intente mas adelante.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

}
