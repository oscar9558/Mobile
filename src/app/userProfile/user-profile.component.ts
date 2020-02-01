import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserClass } from '../models/userClass';
import { UserService } from '../services/user.service';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  @ViewChild(ProfileInformationComponent, { static: true })
  profileInformationComponent: ProfileInformationComponent;

  @ViewChild(PersonalInformationComponent, { static: true })
  personalInformationComponent: PersonalInformationComponent;

  profileInformation;
  isActive = sessionStorage.getItem('isProfileComplete') === 'true';

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.slideOpts.initialSlide = 0;
    this.profileInformation = JSON.parse(sessionStorage.getItem('profileInformation'));
  }

  save() {
    let user = new UserClass();
    user.role = this.profileInformation.role;
    user.companyName = this.profileInformationComponent.companyName;
    user.firstName = this.profileInformationComponent.firstName;
    user.secondName = this.profileInformationComponent.secondName;
    user.surname = this.profileInformationComponent.surname;
    user.secondSurname = this.profileInformationComponent.secondSurname;
    user.email = this.profileInformationComponent.email;
    user.image = this.profileInformationComponent.image;
    user.gender = this.personalInformationComponent.gender;
    user.documentType = this.personalInformationComponent.documentType;
    user.documentNumber = this.personalInformationComponent.documentNumber;
    user.companyAssociated = this.personalInformationComponent.companyAsociated;
    user.phone = this.personalInformationComponent.phone;
    user.department = this.personalInformationComponent.department;
    user.city = this.personalInformationComponent.city;
    user.adress = this.personalInformationComponent.adress;
    if (user.validateComplete(this.profileInformation.role)) {
      this.userService.update(user).subscribe(res => {
        sessionStorage.setItem("profileInformation", JSON.stringify(res.profileInformation));
        this.router.navigate(['/news']);
      });
    }
  }
}
