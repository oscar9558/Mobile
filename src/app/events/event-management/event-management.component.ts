import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CreateEditEventComponent } from './create-edit-event/create-edit-event.component';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagement implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  @ViewChild(CreateEditEventComponent, { static: true })
  createEditEventComponent: CreateEditEventComponent

  latitude: number;
  longitude: number;
  zoom: number = 20;
  address: string;
  private geoCoder;
  userName: any;
  events: any;

  constructor(private eventService: EventsService,
    private router: Router) {

  }

  ngOnInit() {
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
    this.reloadEvents();
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  createEvent() {
    sessionStorage.setItem("EditEvent", JSON.stringify(null));
    this.router.navigate(['events/event-management/create'])
  }

  editEvent(event) {
    sessionStorage.setItem("EditEvent", JSON.stringify(event));
    this.router.navigate(['events/event-management/create'])
  }

  reloadEvents() {
    this.eventService.eventsByOwner(this.userName).subscribe(res => {
      this.events = res;
    });
  }
}
