import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from 'src/app/models/eventClass';
import { MapsAPILoader } from '@agm/core';
import { EventsService } from 'src/app/services/events.service';
import { PermitService } from 'src/app/services/permit.service';
import { EventWithUser } from 'src/app/models/eventWithUser';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

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
    permitService: PermitService,
    public actionSheetController: ActionSheetController
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

  async presentActionSheet() {
    let buttons = [];
    const asistir = {
      text: 'Asistir', icon: 'checkmark-circle-outline', handler: () => {
        this.addEvent();
      }
    }
    const cancelarAsistencia = {
      text: 'Cancelar Asistencia', icon: 'close-circle-outline', handler: () => {
        this.removeEvent();
      }
    }
    const editar = {
      text: 'Editar', icon: 'create', handler: () => {
        this.editEventImp();
      }
    }
    const eliminar = {
      text: 'Eliminar', role: 'destructive', icon: 'trash', handler: () => {
        this.deleteEvent();
      }
    }

    if (this.insideMap && !this.userEvent && this.attendEvents && !this.senUserParticipate) {
      buttons.push(asistir);
    }

    if (!this.insideMap && !this.ownerEvent && this.attendEvents) {
      buttons.push(cancelarAsistencia);
    }
    if (!this.insideMap && !this.userEvent) {
      buttons.push(eliminar);
      buttons.push(editar);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Administracion de Eventos',
      buttons: buttons
    });
    await actionSheet.present();
  }

}
