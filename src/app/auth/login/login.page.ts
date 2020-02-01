import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  password: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login(user, password) {
    let userRequest = { email: user, password: password };
    this.authService.login(userRequest).subscribe((response) => {
      let map = new Map<String, Array<String>>();
      map.set(response.username, response.userPermits);
      sessionStorage.setItem('userPermits', JSON.stringify(Array.from(map.entries())));
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem("profileInformation", JSON.stringify(response.profileInformation));
      sessionStorage.setItem("isProfileComplete", response.isProfileComplete);
      this.router.navigateByUrl('news');
    });
  }

  register(){
    this.router.navigate(['/register']);
  }
}
