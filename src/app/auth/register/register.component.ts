import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  profiles = ['Ganadero', 'Alcalde', 'Gobernador', 'Empresa', 'Recolector', 'Veterinario'];
  role = 'Ganadero';
  companyName;
  firstName;
  secondName;
  surname;
  secondSurname;
  email;
  password;
  passwordValidation;

  ngOnInit() {
    this.role = 'Ganadero';
    this.companyName = null;
    this.firstName = null;
    this.secondName = null;
    this.surname = null;
    this.secondSurname = null;
    this.email = null;
    this.password = null;
    this.passwordValidation = null;
  }
  register() {
    if (this.requiredValues()) {
      if (this.password === this.passwordValidation) {
        let userRegister = this.getUserPojo();
        this.userService.register(userRegister).subscribe(
          response => {
            if (response === null) {
              this.back();
              //this.alertPopupComponent.showSuccess("successRegistration");
              //this.closePopup();
            }
          },
          error => {
            //this.alertPopupComponent.showError(error.error.errorCode);
          }
        );
      } else {
        //this.alertPopupComponent.showError('002');
      }
    } else {
      //this.alertPopupComponent.showError('incompleteData');
    }
  }

  back() {
    this.router.navigate(['login'])
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

}
