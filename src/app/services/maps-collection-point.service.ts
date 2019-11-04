import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Services } from "./services.service";


@Injectable({
  providedIn: "root"
})
export class MapsCollectionPointService extends Services {
  redirectUrl: string;
  router: any;
  isLoggedIn = false;
  apiURL: string = "";
  headers = this.GetHttpHeaders();

  constructor(private http: HttpClient, @Inject("apiUrl") url: string) {
    super();
    this.apiURL = url + "api/maps/milkCollection/";
  }

  findPoints(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + "getCollectionPoints/" + "oscar@gmail.com",
      {
        withCredentials: false,
        headers: this.headers
      }
    );
  }
  updatePoints(): Observable<any> {
    return this.http.get<any>(
      this.apiURL + "updateTruckerPosition/" + "oscar@gmail.com",
      {
        withCredentials: false,
        headers: this.headers
      }
    );
  }

}
