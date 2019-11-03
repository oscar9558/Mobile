import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Services } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class NewsDownloadService extends Services {

  redirectUrl: string;

  router: any;
  isLoggedIn = false;
  apiURL: string = '';
  headers = this.GetHttpHeaders();

  constructor(private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/newsDownload/news/';
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  }

  findAllNews(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'findAll',
      { withCredentials: false, headers: this.headers }
    );
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'findById/' + id,
      { withCredentials: false, headers: this.headers }
    );
  }


}
