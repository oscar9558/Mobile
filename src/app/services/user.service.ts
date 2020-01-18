import { Injectable, Inject } from '@angular/core';
import { Services } from './services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Services {
  redirectUrl: string;
  apiURL: string = '';
  headers = this.GetHttpHeaders();

  constructor(private router: Router, private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/core/';
  }

  register(user): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'users/register',
      user,
      { withCredentials: false, headers: this.headers }
    );
  }

  update(user): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'users/updateProfile',
      user,
      { withCredentials: false, headers: this.headers }
    );
  }

  updateImage(user, image): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'users/updateProfileImage/' + user,
      image,
      { withCredentials: false, headers: this.headers }
    );
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'users/findCompanys',
      { withCredentials: false, headers: this.headers }
    );
  }

  getEvents(username: string): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'users/consultEvents/' + username,
      { withCredentials: false, headers: this.headers }
    );
  }

}
