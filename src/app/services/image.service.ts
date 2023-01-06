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

    const req = new HttpRequest('POST', `${this.baseurl}/upload`, formData, {
      headers: this.optionRequete,
      reportProgress: true,
      responseType: 'json',
    });
    console.log(formData);

    return this.http.request(req);
  }

  // GET
  getFile(id: string) : Observable<any> {
    return this.http.get(`${this.baseurl}/files/` + id, {
      headers: this.optionRequete,
    }).pipe(catchError(this.errorHandler));; 
  }

  // GET
  getFileInfo(id: string) : Observable<any> {
    return this.http.get(`${this.baseurl}/filesInfo/` + id, {
      headers: this.optionRequete,
    }).pipe(catchError(this.errorHandler));; 
  }
  // GET
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseurl}/files`, {
      headers: this.optionRequete,
    }).pipe(catchError(this.errorHandler));;
  }

  // GET
  getAllFiles(): Observable<any> {
    return this.http
      .get<any>(this.baseurl + '/files', {
        headers: this.optionRequete,
      })
      .pipe(catchError(this.errorHandler));
  }

  

  // DELETE
  deleteFile(id: number) {
    return this.http
      .delete<any>(this.baseurl + '/files/' + id, {
        headers: this.optionRequete,
      })
      .pipe(catchError(this.errorHandler));
  }

  // PUT
  updateStatus(id: string, data: string) {
    console.log("j'envoi  " + data + " pour l'id " + id);
    return this.http
    .put<any>(this.baseurl + '/files/' + id, data, {
      headers: this.optionRequete,
    })
    .pipe(catchError(this.errorHandler));
  }


}
