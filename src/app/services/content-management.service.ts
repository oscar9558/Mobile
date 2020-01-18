import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Services } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService extends Services {

  redirectUrl: string;

  router: any;
  isLoggedIn = false;
  apiURL: string = '';
  headers = this.GetHttpHeaders();

  constructor(private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/core/';
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  }

  create(content): Observable<any> {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(
      this.apiURL + 'uploadContent', content,
      { withCredentials: false, headers: this.headers }
    );
  }
  
  edit(content): Observable<any> {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(
      this.apiURL + 'editContent', content,
      { withCredentials: false, headers: this.headers }
    );
  }
  
  delete(id): Observable<any> {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(
      this.apiURL + 'deleteContent', id,
      { withCredentials: false, headers: this.headers }
    );
  }

  getContent(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'getContents',
      { withCredentials: false, headers: this.headers }
    );
  }

  findById(id: any) {
    return this.http.get<any>(
      this.apiURL + 'getContentById/' + id,
      { withCredentials: false, headers: this.headers }
    );
  }

}

