import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const requestOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Accept': 'text/plain',
    'Content-Type': 'text/plain',
    'responseType': 'text'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }
  
  getWeekend() : Observable<string> {
    return this.httpClient.get("/weekend", {responseType: 'text'});
  }

}