import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  [x: string]: any;

  serviceURL = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User();

  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<any> {
    const url = `${this.serviceURL}/addUser`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  getUsers() {
    return this.http.get(`${this.serviceURL}/getallUser`);
  }

  getUser(id: any): Observable<any> {
    const url = `${this.serviceURL}/getUser/${id}`;
    return this.http.get<Response>(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  createReserv(data: any): Observable<any> {
    const url = `${this.serviceURL}/addReserv`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  getReserv() {
    return this.http.get(`${this.serviceURL}/getReserv`);
  }

  setLoggedInUser(user: any){
    this.user = user;
  }

  getLoggedInUser(){
    return this.user;
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return errorMessage;
  }
}
