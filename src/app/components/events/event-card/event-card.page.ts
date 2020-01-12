import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/models/classes/eventClass';
import { MapsAPILoader } from '@agm/core';
import { EventsService } from '../../../services/eventServices/events.service';
import { EventWithUser } from 'src/app/models/classes/eventWithUser';
import { PermitService } from 'src/app/services/permitService/permit.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.page.html',
  styleUrls: ['./event-card.page.scss'],
})

export class EventCardPage implements OnInit {

  @Output() editEvent = new EventEmitter<Event>();
  @Output() reloadEvents = new EventEmitter<boolean>();
  @Input() ownerEvent = false;
  @Input() userEvent = false;
  @Input() insideMap = false;
  @Input() event: Event;
  @Input() eventWithUsers: EventWithUser;

  private geoCoder;
  address: string;
  searchElementRef: any;
  ngZone: any;
  latitude: number;
  longitude: number;
  zoom: number;
  userName: any;
  senUserParticipate: any;
  attendEvents: boolean;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private eventService: EventsService,
    permitService: PermitService
  ) {
    const permits = permitService.getPermitsMap();
    this.attendEvents = permits["ATTEND_EVENTS"];
  }


  ngOnInit() {
    this.autoCompletePlaces();
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
    if (this.eventWithUsers) {
      this.senUserParticipate = this.eventWithUsers.user.find(x => x.accountInformation.username === this.userName);
      this.event = this.eventWithUsers.event;
    }
  }

  private autoCompletePlaces() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.getAddress(this.event.place.latitude, this.event.place.longitude)
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        }
      }
    });
  }

  editEventImp() {
    this.editEvent.emit(this.event);
  }

  deleteEvent() {
    this.eventService.delete(this.event._id).subscribe(
      res => {
        //TODO: show popup
        this.reloadEvents.emit(true);
      }
    );
  }

  addEvent() {
    this.eventService.addEvent(this.userName, this.event._id).subscribe(
      res => {
        //TODO: show popup
      }
    );
  }

  removeEvent() {
    this.eventService.removeEvent(this.userName, this.event._id).subscribe(
      res => {
        //TODO: show popup
        this.reloadEvents.emit(true);
      }
    );
  }

}
