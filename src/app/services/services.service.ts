import { HttpHeaders } from '@angular/common/http';

export class Services {

  public GetHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    return headers;
  }

}