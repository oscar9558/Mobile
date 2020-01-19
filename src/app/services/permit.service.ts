import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermitService {
  permitsMap = {
    CREATE_EVENTS: false,
    ATTEND_EVENTS: false,
    CONSULT_EVENTS: false,
    CONTENT_UPLOAD: false,
    CONTENT_VIEW: false,
    CONTENT_DOWNLOAD: false,
    PROFILE: false,
    NOTIFICATIONS: false,
    CREATE_MILK_REQUEST: false,
    ASOCIATE_MILK_REQUEST: false,
    TRACKING: false,
    NEWS_UPLOAD: false,
    NEWS_DOWNLOAD: false
  };

  constructor() {
    this.updatePermissions();
  }

  updatePermissions() {
    this.inicializePermits();
    let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
    let permits: any = Array.from(map.values())[0];
    if (permits) {
      permits.forEach(permit => {
        this.permitsMap[permit] = true;
      });
    }
  }

  private inicializePermits() {
    this.permitsMap = {
      CREATE_EVENTS: false,
      ATTEND_EVENTS: false,
      CONSULT_EVENTS: false,
      CONTENT_UPLOAD: false,
      CONTENT_VIEW: false,
      CONTENT_DOWNLOAD: false,
      PROFILE: false,
      NOTIFICATIONS: false,
      CREATE_MILK_REQUEST: false,
      ASOCIATE_MILK_REQUEST: false,
      TRACKING: false,
      NEWS_UPLOAD: false,
      NEWS_DOWNLOAD: false
    };
  }

  getPermitsMap() {
    return this.permitsMap;
  }

}
