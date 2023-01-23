import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const requestOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Accept': 'application/xml',
    'Content-Type': 'application/xml',
    'responseType': 'text'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PressService {

  constructor(private httpClient: HttpClient) { }
  
  getPress() : Observable<string> {
    return this.httpClient.get("/lemonde/jeux-video/rss_full.xml", {responseType: 'text'});
  }

}