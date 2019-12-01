import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RegisterPage } from 'src/app/register/register.page';
import { AlertPopupPage } from 'src/app/alert-popup/alert-popup.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  password: string;

  @ViewChild(RegisterPage, { static: false })
  registerPage: RegisterPage;

  @ViewChild(AlertPopupPage, { static: false })
  alertPopupPage: AlertPopupPage;

  constructor(private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }

  login(user, password) {
    if (user && password) {
      this.notificationService.connect();
      let userRequest = { email: user, password: password };
      this.authService.login(userRequest).subscribe(
        response => {
          let map = new Map<String, Array<String>>();
          map.set(response.username, response.userPermits);
          sessionStorage.setItem('userPermits', JSON.stringify(Array.from(map.entries())));
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem("profileInformation",JSON.stringify(response.profileInformation));
          sessionStorage.setItem("isProfileComplete",response.isProfileComplete);
          if(response.isProfileComplete){
            this.router.navigate(['/news']);
          }else{
            this.router.navigate(['/userProfile']);
          }
          this.authService.setIsLoggedIn(true);
        },
        error => {
          this.alertPopupComponent.showError(error.error.errorCode);
        }
      );
    }
  }

  openRegisterPopup() {
    this.registerPage.openPopup();
  }
}
