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
    this.authService.login(userRequest).subscribe((res) => {
      this.router.navigateByUrl('news');
    });
  }

}
