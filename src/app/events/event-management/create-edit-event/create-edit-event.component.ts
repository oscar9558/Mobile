import { Component, OnInit, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { EventsService } from 'src/app/services/events.service';
import { EventRequest } from 'src/app/models/eventRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.css',
  ]
})
export class CreateEditEventComponent implements OnInit {

  @ViewChild('search', { read: ElementRef, static: true })
  public searchElementRef: ElementRef;
  @Output() reloadEvents = new EventEmitter<boolean>();

  showPopup: boolean = false;
  private geoCoder;

  latitude: number;
  longitude: number;
  zoom: number;
  eventTitle: string;
  description: string;
  duration: number;
  capacityAttendees: number
  image: any = '';
  date: Date;
  userName: any;
  edit: boolean = false;
  eventId: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private eventService: EventsService,
    private router: Router
  ) { }


  ngOnInit() {
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
    let edit = JSON.parse(sessionStorage.getItem('EditEvent'));
    this.openPopup(edit);
  }

  back() {
    this.router.navigate(['events/event-management'])
  }


  openPopup(edit?) {
    this.showPopup = true;
    if (edit) {
      this.edit = true;
      this.initData(edit);
      this.zoom = 15;
    } else {
      this.updateCurrentLocation();
    }
  }

  private initData(edit) {
    this.eventId = edit._id;
    this.latitude = edit.place.latitude;
    this.longitude = edit.place.longitude;
    this.eventTitle = edit.title;
    this.description = edit.description;
    this.duration = edit.duration;
    this.capacityAttendees = edit.capacityAttendees;
    this.image = edit.image;
    this.date = new Date(edit.date);
  }

  private updateCurrentLocation() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

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

  createEvent() {
    let pojo: EventRequest = this.getPojo();
    this.eventService.create(pojo).subscribe(res => {
      this.reloadEvents.emit(true);
      this.back();
    })
  }

  editEvent() {
    let pojo: EventRequest = this.getPojo();
    this.eventService.edit(this.eventId, pojo).subscribe(res => {
      this.reloadEvents.emit(true);
      this.back();
    })
  }

  private getPojo(): EventRequest {
    return {
      username: this.userName,
      title: this.eventTitle,
      description: this.description,
      date: this.date,
      duration: this.duration,
      place: {
        longitude: this.longitude,
        latitude: this.latitude
      },
      image: this.image,
      numberAttendees: 0,
      capacityAttendees: this.capacityAttendees
    } as EventRequest

  }


}
