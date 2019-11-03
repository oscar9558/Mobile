import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Services } from './services.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends Services {
  redirectUrl: string;

  apiURL: string = '';
  headers = this.GetHttpHeaders();

  constructor(private router: Router, private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/core/';
  }

  login(usuario): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'login/',
      usuario,
      { withCredentials: false, headers: this.headers }
    );
  }

  logout(): void {
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

}