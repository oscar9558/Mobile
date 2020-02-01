import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserProfileComponent } from './user-profile.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  },
]
@NgModule({
  declarations: [UserProfileComponent, PersonalInformationComponent, ProfileInformationComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule { }
