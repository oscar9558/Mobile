import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { ProfileInformationPage } from './profile-information/profile-information.page';
import { PersonalInformationPage } from './personal-information/personal-information.page';
import { UserClass } from 'src/app/models/classes/userClass';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {


  @ViewChild(ProfileInformationPage, { static: false })
  profileInformationPage: ProfileInformationPage;

  @ViewChild(PersonalInformationPage, { static: false })
  personalInformationPage: PersonalInformationPage;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  profileInformation;
  isActive = sessionStorage.getItem('isProfileComplete') === 'true';

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.profileInformation = JSON.parse(sessionStorage.getItem('profileInformation'));
  }

  save() {
    let user = new UserClass();
    user.role = this.profileInformation.role;
    user.companyName = this.profileInformationPage.companyName;
    user.firstName = this.profileInformationPage.firstName;
    user.secondName = this.profileInformationPage.secondName;
    user.surname = this.profileInformationPage.surname;
    user.secondSurname = this.profileInformationPage.secondSurname;
    user.email = this.profileInformationPage.email;
    user.image = this.profileInformationPage.image;
    user.gender = this.personalInformationPage.gender;
    user.documentType = this.personalInformationPage.documentType;
    user.documentNumber = this.personalInformationPage.documentNumber;
    user.companyAssociated = this.personalInformationPage.companyAsociated;
    user.phone = this.personalInformationPage.phone;
    user.department = this.personalInformationPage.department;
    user.city = this.personalInformationPage.city;
    user.adress = this.personalInformationPage.adress;
    if (user.validateComplete(this.profileInformation.role)) {
      this.userService.update(user).subscribe(res => {
        sessionStorage.setItem("profileInformation", JSON.stringify(res.profileInformation));
        this.router.navigate(['/news']);
      });
    }
  }

}
