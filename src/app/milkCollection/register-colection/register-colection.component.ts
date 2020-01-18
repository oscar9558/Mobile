import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { UserService } from 'src/app/services/user.service';
import { MilkCollectionService } from 'src/app/services/milk-collection.service';

@Component({
  selector: 'app-register-colection',
  templateUrl: './register-colection.component.html',
  styleUrls: ['./register-colection.component.css',
  ]
})
export class RegisterColectionComponent implements OnInit {

  latitude: number;
  milkCompany: string;
  longitude: number;
  zoom: number = 10;
  address: string;
  private geoCoder;

  @ViewChild('search', { read: ElementRef, static: true })
  public searchElementRef: ElementRef;
  companies: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private userService: UserService,
    private milkCollectionService: MilkCollectionService
  ) { }

  ngOnInit() {
    this.getCompanies();
    this.autoCompletePlaces();
  }

  getCompanies() {
    this.userService.getCompanies().subscribe(res => {
      this.companies = res;
    })
  }

  private autoCompletePlaces() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        }
      }
    });
  }

  createRequest() {
    const pojo = this.createPojo();
    this.milkCollectionService.createMilkCollectionRequest(pojo).subscribe(
      res => {
        //TODO
        //this.alertPopupComponent.showSuccess("sucessMilkRequest");
      }
    )
  }

  createPojo() {
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    let userName = map.keys().next().value;
    return {
      "company": this.milkCompany,
      "longitude": this.longitude,
      "latitude": this.latitude,
      "address": this.address,
      "username": userName
    }
  }

}
