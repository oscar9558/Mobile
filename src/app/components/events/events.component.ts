import { Component, OnInit } from '@angular/core';
import { PermitService } from 'src/app/services/permitService/permit.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  currentMenu = 'Listado_Eventos';
  consultEvents: boolean;
  createEvents: boolean;
  fillerNav = [];

  constructor(permitService: PermitService) {
    const permits = permitService.getPermitsMap();
    this.createEvents = permits["CREATE_EVENTS"];
    this.consultEvents = permits["CONSULT_EVENTS"];
  }

  ngOnInit() {
    if (this.consultEvents) {
      this.fillerNav.push({ menuId: "Listado_Eventos", menuTitle: "Eventos" });
      this.fillerNav.push({ menuId: "Mis_Eventos", menuTitle: "Mis Eventos" });
    }
    if (this.createEvents) {
      this.fillerNav.push({ menuId: "Administracion_Eventos", menuTitle: "Administracion de Eventos" });
    }
  }

}
