import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from "@ionic-native/google-maps";
import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { MapsCollectionPointService } from "../../services/maps-collection-point.service";

@Component({
  selector: "app-collection-points",
  templateUrl: "./collection-points.page.html",
  styleUrls: ["./collection-points.page.scss"]
})
export class CollectionPointsPage implements OnInit {
  map: GoogleMap;
  routes: any;
  constructor(
    private geolocation: Geolocation,
    private MapsCollectionPointService: MapsCollectionPointService
  ) {}

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
          debugger;
          this.routes = res;
          this.loadMap();
        });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  ngOnInit() {
    debugger;
    this.locate();
    
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
    debugger;

    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.routes.forEach(element => {
      this.map.addMarkerSync({
        title: "Ruta",
        icon: "red",
        animation: "DROP",
        position: {
          lat: element.x,
          lng: element.y
        }
      });
    });

    let marker: Marker = this.map.addMarkerSync({
      title: "Mi ubicación",
      icon: "blue",
      animation: "DROP",
      position: {
        lat: this.latitude,
        lng: this.longitude
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert("clicked");
    });
  }
}
