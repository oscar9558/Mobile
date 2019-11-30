import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AlertPopupPage } from '../alert-popup/alert-popup.page';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild(AlertPopupPage, { static: false })
  alertPopupPage: AlertPopupPage;

  constructor(private userService: UserService) { }

  profiles = ['Ganadero', 'Alcalde', 'Gobernador', 'Empresa', 'Recolector'];
  left = 0;
  right = 0;
  showPopup = false;
  role = 'Ganadero';
  companyName;
  firstName;
  secondName;
  surname;
  secondSurname;
  email;
  password;
  passwordValidation;

  calculatePopupPosition() {
    return { 'top.px': window.innerHeight / 5, 'left.px': window.innerWidth / 4, 'height.px': window.innerHeight / 2 };
  }

  ngOnInit() {
    this.calculatePopupPosition();
  }

  closePopup() {
    this.showPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  register() {
    if (this.requiredValues()) {
      if (this.password === this.passwordValidation) {
        let userRegister = this.getUserPojo();
        this.userService.register(userRegister).subscribe(
          response => {
            if (response === null) {
              this.alertPopupPage.showSuccess("successRegistration");
              this.closePopup();
            }
          },
          error => {
            this.alertPopupPage.showError(error.error.errorCode);
          }
        );
      } else {
        this.alertPopupPage.showError('002');
      }
    } else {
      this.alertPopupPage.showError('incompleteData');
    }

  }

  getUserPojo() {
    if (this.role === 'Empresa') {
      return {
        companyName: this.companyName,
        firstName: null,
        secondName: null,
        surname: null,
        secondSurname: null,
        email: this.email,
        password: this.password,
        passwordVerificated: this.passwordValidation,
        role: this.role,
      };
    } else {
      return {
        companyName: null,
        firstName: this.firstName,
        secondName: this.secondName,
        surname: this.surname,
        secondSurname: this.secondSurname,
        email: this.email,
        password: this.password,
        passwordVerificated: this.passwordValidation,
        role: this.role,
      };
    }
  }

  private requiredValues() {
    if (this.role === 'Empresa') {
      return this.companyName && this.email && this.password && this.passwordValidation && this.role;

    } else {

      return this.firstName && this.surname && this.email && this.password && this.passwordValidation && this.role;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculatePopupPosition();
  }

}
