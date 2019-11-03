import { Injectable } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Injectable({
  providedIn: "root"
})
export class MapsCollectionPointService {
  
  //importar en el constructor el servicio de geolocalizacion
  constructor(private geolocation: Geolocation) { }

  //declarar dos variables dentro de la clase
  latitude;
  longitude;

  //crear un metodo donde se almacena las variables declaradas
  locate() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
