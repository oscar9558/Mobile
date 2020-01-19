import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListEventsComponent } from './list-events/list-events.component';
import { EventsService } from '../services/events.service';
import { ListEventsMapComponent } from './list-events/list-events-map/list-events-map.component';
import { EventManagement } from './event-management/event-management.component';
import { EventCardComponent } from './event-card/event-card.component';
import { CreateEditEventComponent } from './event-management/create-edit-event/create-edit-event.component';
import { UserEventsComponent } from './user-events/user-events.component';

const routes: Routes = [
  {
    path: 'list-events',
    component: ListEventsComponent
  },
  {
    path: 'list-events/map',
    component: ListEventsMapComponent
  },
  {
    path: 'user-events',
    component: UserEventsComponent
  },
  {
    path: 'event-management',
    component: EventManagement
  },
  {
    path: 'event-management/create',
    component: CreateEditEventComponent
  }
];

@NgModule({
  declarations: [
    ListEventsComponent,
    ListEventsMapComponent,
    EventCardComponent,
    EventManagement,
    CreateEditEventComponent,
    UserEventsComponent
  ],
  exports: [
    ListEventsComponent,
    ListEventsMapComponent,
    EventManagement,
    EventCardComponent,
    CreateEditEventComponent,
    UserEventsComponent
  ],
  providers: [EventsService],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpVWMklD04vSwxU3OhMpDIBZLvF6cfj-E',
      libraries: ['places']
    })
  ]
})
export class EventsModule { }
