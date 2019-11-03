import { Injectable } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Injectable({
  providedIn: "root"
})
export class MapsCollectionPointService {
  constructor(private geolocation: Geolocation) {}

  locate() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log(
          "lat" + resp.coords.latitude + "- long" + resp.coords.longitude
        );
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
