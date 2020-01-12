import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventsPage } from './events.page';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { EventsService } from 'src/app/services/eventServices/events.service';
import { AngularMaterialModule } from '../../shared/modules/angular-material.module';
import { AlertPopupModule } from '../alert-popup/alert-popup.module';
import { CreateEditEventComponent } from './event-management/create-edit-event/create-edit-event.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventsComponent } from './events.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { EventManagement } from './event-management/event-management.component';


const routes: Routes = [
  {
    path: '',
    component: EventsPage
  }
];


@NgModule({
  declarations: [EventsComponent, ListEventsComponent, UserEventsComponent, EventCardComponent, CreateEditEventComponent, EventManagement],
  exports: [EventsComponent, ListEventsComponent, UserEventsComponent, EventCardComponent, CreateEditEventComponent, EventManagement],
  providers: [EventsService],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatSliderModule,
    AlertPopupModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpVWMklD04vSwxU3OhMpDIBZLvF6cfj-E',
      libraries: ['places']
    })
  ]
})
export class EventsPageModule { }
