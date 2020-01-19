import { Injectable, Inject } from '@angular/core';
import { Services } from './services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventRequest } from '../models/eventRequest';
import { NearestEvents } from '../models/nearestEvents';

@Injectable()
export class EventsService extends Services {

  redirectUrl: string;

  router: any;
  isLoggedIn = false;
  apiURL: string = '';
  headers = this.GetHttpHeaders();

  constructor(private http: HttpClient, @Inject('apiUrl') url: string) {
    super();
    this.apiURL = url + 'api/core/events/';
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  }

  create(eventRequest: EventRequest): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'create/', eventRequest,
      { withCredentials: false, headers: this.headers }
    );
  }

  edit(eventId: string, eventRequest: EventRequest): Observable<any> {
    return this.http.post<any>(
      this.apiURL + 'edit/' + eventId, eventRequest,
      { withCredentials: false, headers: this.headers }
    );
  }

  delete(eventId: string): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'delete/' + eventId,
      { withCredentials: false, headers: this.headers }
    );
  }

  consultParticipants(eventId: string): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'consultParticipants/' + eventId,
      { withCredentials: false, headers: this.headers }
    );
  }

  addEvent(username: string, eventId: string): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'addEvent/' + username + '/' + eventId,
      { withCredentials: false, headers: this.headers }
    );
  }

  removeEvent(username: string, eventId: string): Observable<any> {
    return this.http.get<any>(
      this.apiURL + 'removeEvent/' + username + '/' + eventId,
      { withCredentials: false, headers: this.headers }
    );
  }

  nearestEvents(distance: NearestEvents): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}nearestEvents/`, distance,
      { withCredentials: false, headers: this.headers }
    );
  }

  eventsByOwner(username: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}getEventsByOwner/${username}`,
      { withCredentials: false, headers: this.headers }
    );
  }
}
