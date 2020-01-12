
import { Component, OnInit, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { EventRequest } from 'src/app/models/classes/eventRequest';
import { EventsService } from 'src/app/services/eventServices/events.service';
import { Event } from 'src/app/models/classes/eventClass';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss',
    '../../../../../assets/gridStyles.css',
    '../../../../../assets/popupStyles.css'
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
    private eventService: EventsService
  ) { }

  calculatePopupPosition() {
    return { 'top.px': window.innerHeight / 6, 'left.px': window.innerWidth / 4, 'height.px': window.innerHeight / 2 };
  }

  ngOnInit() {
    this.calculatePopupPosition();
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
  }

  closePopup() {
    this.showPopup = false;
    this.latitude = null;
    this.longitude = null;
    this.eventTitle = null;
    this.description = null;
    this.duration = null;
    this.capacityAttendees = null;
    this.image = null;
    this.date = null;
    this.edit = false;
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
      this.closePopup();
    })
  }

  editEvent() {
    let pojo: EventRequest = this.getPojo();
    this.eventService.edit(this.eventId, pojo).subscribe(res => {
      this.reloadEvents.emit(true);
      this.closePopup();
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

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}
