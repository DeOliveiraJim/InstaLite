import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../shared/user';
import { AbstractService } from './abstract.service';
@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractService {
  constructor(private http: HttpClient) {
    super();
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
  };

  createUser(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.baseurl + '/register/user', JSON.stringify(data), {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler));
  }

  //POST
  logUser(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.baseurl + '/login', JSON.stringify(data), {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.errorHandler));
  }

  // GET
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.baseurl + '/user/' + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseurl + '/user')
      .pipe(retry(1), catchError(this.errorHandler));
  }

  // GET
  getWelcomeUser(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get(this.baseurl + '/welcome/user', {
        headers,
        responseType: 'text',
        withCredentials: true,
      })
      .pipe(retry(0), catchError(this.errorHandler));
  }

  // PATCH
  updateUser(id: number, data: any): Observable<User> {
    return this.http
      .patch<User>(
        this.baseurl + '/user/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // DELETE
  deleteUser(id: number) {
    return this.http
      .delete<User>(this.baseurl + '/user/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //  POST
  logoutUser(): Observable<any> {    
    return this.http.post(this.baseurl + '/logout', this.httpOptions);
  }
}
