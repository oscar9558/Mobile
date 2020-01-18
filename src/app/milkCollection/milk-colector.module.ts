import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterColectionComponent } from './register-colection/register-colection.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MilkCollectionRequestComponent } from './milk-collection-request/milk-collection-request.component';
import { MilkCollectionRequestCompanyComponent } from './milk-collection-request-company/milk-collection-request-company.component';
import { AssignCollectorComponent } from './milk-collection-request-company/assign-driver/assign-collector.component';

const routes: Routes = [
  {
    path: 'register-colection',
    component: RegisterColectionComponent
  },
  {
    path: 'farmer-request',
    component: MilkCollectionRequestComponent
  },
  {
    path: 'request-list',
    component: MilkCollectionRequestCompanyComponent
  },
];

@NgModule({
  declarations: [
    RegisterColectionComponent,
    MilkCollectionRequestComponent,
    MilkCollectionRequestCompanyComponent,
    AssignCollectorComponent
  ],
  exports: [
    RegisterColectionComponent,
    MilkCollectionRequestComponent,
    MilkCollectionRequestCompanyComponent,
    AssignCollectorComponent
  ],
  entryComponents: [
    AssignCollectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpVWMklD04vSwxU3OhMpDIBZLvF6cfj-E',
      libraries: ['places']
    }),
    RouterModule.forChild(routes)
  ]
})
export class MilkColectorModule { }
