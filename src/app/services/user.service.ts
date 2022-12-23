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
      'Content-Type': 'application/json',
    }),
  };

  // POST
  createUser(data: any): Observable<User> {
    return this.http
      .post<User>(
        this.baseurl + '/users',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.baseurl + '/users/' + id)
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // GET
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseurl + '/users')
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // PATCH
  updateUser(id: number, data: any): Observable<User> {
    return this.http
      .patch<User>(
        this.baseurl + '/users/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }
  // DELETE
  deleteUser(id: number) {
    return this.http
      .delete<User>(this.baseurl + '/users/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandler));
  }
}
