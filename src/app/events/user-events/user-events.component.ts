import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateEditEventComponent } from '../event-management/create-edit-event/create-edit-event.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {

  @ViewChild(CreateEditEventComponent, { static: true })
  createEditEventComponent: CreateEditEventComponent

  latitude: number;
  longitude: number;
  zoom: number = 20;
  address: string;
  private geoCoder;
  userName: any;
  events = [];

  constructor(private userService: UserService) { }

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
    this.createEditEventComponent.openPopup();
  }

  editEvent(event) {
    this.createEditEventComponent.openPopup(event);
  }

  reloadEvents() {
    this.userService.getEvents(this.userName).subscribe(res => {
      this.events = res;
    });
  }

}
