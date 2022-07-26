import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiURL = "http://app.dashfleet.devel/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor( private http: HttpClient ){

  }


  makeConsult( data:any ){
    return this.http.post(`${this.apiURL}/makeConsult`, data, {observe: 'events', reportProgress: true})
    // return this.http.get(`${this.apiURL}/makeConsult`, {observe: 'events', reportProgress: true})
  }
}
