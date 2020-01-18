import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterColectionComponent } from './register-colection/register-colection.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'register-colection',
    component: RegisterColectionComponent
  }
];

@NgModule({
  declarations: [
    RegisterColectionComponent,
  ],
  exports: [
    RegisterColectionComponent,
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
