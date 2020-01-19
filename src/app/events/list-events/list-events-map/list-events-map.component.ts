import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { EventsService } from 'src/app/services/events.service';
import { NearestEvents } from 'src/app/models/nearestEvents';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-events-map',
  templateUrl: './list-events-map.component.html',
  styleUrls: ['./list-events-map.component.css'],
})
export class ListEventsMapComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number = 20;
  radius: number = 1000;

  events = [];

  geoCoder: google.maps.Geocoder;

  @ViewChild('search', { read: ElementRef, static: true })
  public searchElementRef: ElementRef;
  address: string;
  eventsWithUser: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private eventService: EventsService,
    private router: Router
  ) {
  }
  ngOnInit() {
    let distance = JSON.parse(sessionStorage.getItem('Distance'));
    this.findEvents(distance);
    this.autoCompletePlaces();
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
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
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
      });
    }
  }

  markerDragEnd($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  openedWindow: number = 0;

  openWindow(id) {
    this.openedWindow = id;
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'km';
    }
    return value;
  }

  findEvents(distance) {
    this.eventService.nearestEvents(distance).subscribe(res => {
      this.events = res;
    });
  }

  back() {
    this.router.navigate(['events/list-events'])
  }
}
