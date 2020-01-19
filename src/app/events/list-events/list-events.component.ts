import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { EventsService } from 'src/app/services/events.service';
import { NearestEvents } from 'src/app/models/nearestEvents';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css',
  ]
})
export class ListEventsComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    this.autoCompletePlaces();
  }

  private autoCompletePlaces() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
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
  }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 14;
          this.address = results[0].formatted_address;
        }
      }
    });
  }

  findEvents() {
    const distance = {
      geolocation: {
        longitude: this.longitude,
        latitude: this.latitude
      },
      radiusDistance: Math.round(this.radius / 1000)
    } as NearestEvents
    this.eventService.nearestEvents(distance).subscribe(res => {
      this.events = res;
    });
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
}
