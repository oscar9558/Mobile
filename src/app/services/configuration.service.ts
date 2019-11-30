import { Injectable, Inject } from '@angular/core';
import { Services } from './services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService extends Services {
  redirectUrl: string;
  apiURL: string = '';
  headers = this.GetHttpHeaders();

  constructor(private router:Router,private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/core/';
  }

  getServices(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'configuration/',
      { withCredentials: false, headers: this.headers }
    );
  }
}