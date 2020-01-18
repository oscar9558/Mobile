import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from "@ionic-native/google-maps";
import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { MapsCollectionPointService } from "../../services/maps-collection-point.service";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-collection-points",
  templateUrl: "./collection-points.page.html",
  styleUrls: ["./collection-points.page.scss"]
})
export class CollectionPointsPage implements OnInit {
  map: GoogleMap;
  routes: any;
  marker: Marker;
  constructor(
    private geolocation: Geolocation,
    private MapsCollectionPointService: MapsCollectionPointService
  ) { }

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
        this.MapsCollectionPointService.findPoints().subscribe(res => {
          this.routes = res;
          this.loadMap();
        });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  tracking() {
    console.log("entre a tracking");
    if (this.map) {
      this.geolocation
        .getCurrentPosition()
        .then(resp => {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          console.log(`${resp.coords.latitude} - ${resp.coords.longitude}`);
          var newPosition = new LatLng(
            this.latitude,
            this.longitude
          );

          this.marker.setPosition(newPosition);
        })
        .catch(error => {
          console.log("Error getting location", error);
        });
    }
  }

  ngOnInit() {
    this.locate();
    const trackingInterval = interval(10000);
    trackingInterval.subscribe(val => this.tracking());
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.routes.forEach(element => {
      let markerOptions: MarkerOptions = {
        position: new LatLng(element.y, element.x),
        title: "mi ruta",
        icon: "red",
        animation: "DROP"
      };
      this.map.addMarker(markerOptions);
    });

    this.marker = this.map.addMarkerSync({
      title: "Mi ubicación",
      icon: "blue",
      animation: "DROP",
      position: {
        lat: this.latitude,
        lng: this.longitude
      }
    });

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert("clicked");
    });
  }
}
