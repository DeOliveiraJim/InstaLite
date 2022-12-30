import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }

  optionRequete = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseurl}/image`, formData, {
      headers: this.optionRequete,
      reportProgress: true,
      responseType: 'json',
    });
    console.log(formData);

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseurl}/image`, {
      headers: this.optionRequete,
    });
  }

  // GET
  getAllFiles(): Observable<any> {
    return this.http
      .get<any>(this.baseurl + '/image', {
        headers: this.optionRequete,
      })
      .pipe(retry(1), catchError(this.errorHandler));
  }
}
