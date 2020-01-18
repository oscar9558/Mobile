import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from './services.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MilkCollectionService extends Services {

  redirectUrl: string;

  router: any;
  isLoggedIn = false;
  apiURL: string = '';
  headers = this.GetHttpHeaders();
  userName;

  constructor(private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/maps/milkCollection/';
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    this.userName = map.keys().next().value;
  }

  createMilkCollectionRequest(pojo){
    return this.http.post<any>(
      this.apiURL + 'createRequest',
      pojo,
      { withCredentials: false, headers: this.headers }
    );
  }
  
  asociateRequest(pojo){
    return this.http.post<any>(
      this.apiURL + 'asociateRequest',
      pojo,
      { withCredentials: false, headers: this.headers }
    );
  }

  findTruckerPosition(username): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'getTruckerPosition/' + username,
      { withCredentials: false, headers: this.headers }
    );
  }

  getRequest(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'getRequest/' + this.userName,
      { withCredentials: false, headers: this.headers }
    );
  }

  getCompanyRequest(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'getCompanyRequest/' + this.userName,
      { withCredentials: false, headers: this.headers }
    );
  }
  
  getCollectorByCompany(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'getCollectorByCompany/' + this.userName,
      { withCredentials: false, headers: this.headers }
    );
  }

}
