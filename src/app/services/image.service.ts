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

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseurl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    console.log(formData);

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseurl}/files`);
  }

  // GET
  getAllFiles(): Observable<any> {
    return this.http
      .get<any>(this.baseurl + '/files/')
      .pipe(retry(1), catchError(this.errorHandler));
  }
}
