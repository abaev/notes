import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

import { User } from './user';
import { ConfigService } from './config.service';


@Injectable()
export class UserService {

  constructor(private http: HttpClient,
  	private conf: ConfigService) { }

  login(username: string, password: string): Observable<any> {
  	return this.http.post(this.conf.serverUrl + 'login', {
  		username: username,
  		password: password
  	}, { 
  				withCredentials: true,
  				responseType: 'text'
  			})
  		.pipe(catchError(this.handleError));
  }


  getNotes(): Observable<any> {
  	return this.http.get(this.conf.serverUrl + 'notes',
  		{ withCredentials: true })
  			.pipe(catchError(this.handleError));
  }


  addUser(username: string, password: string): Observable<any> {
  	return this.http.post(this.conf.serverUrl + 'adduser', {
  		username: username,
  		password: password
  	}, {
  				withCredentials: true,
  				responseType: 'text'
  			})
  		.pipe(catchError(this.handleError));
  }


  updateUser(user: User): Observable<any> {
  	return this.http.put(this.conf.serverUrl + 'updatenotes',
  		user,
  		{
  			withCredentials: true,
  			responseType: 'text'
  			// ,
  			// headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
  		})
  		.pipe(catchError(this.handleError));
  }

 
  logout(): Observable<any> {
  	return this.http.get(this.conf.serverUrl + 'logout',
  		{
  			withCredentials: true,
  			responseType: 'text'
  			// ,
  			// headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
  		})
  		.pipe(catchError(this.handleError));
  }


  deleteAccount(): Observable<any> {
  	return this.http.delete(this.conf.serverUrl + 'deleteuser',
  		{
  			withCredentials: true,
  			responseType: 'text'
  			// ,
  			// headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
  		})
  		.pipe(catchError(this.handleError));
  }


  sendSubscription(pushSubscription: any): Observable<any> {
  	return this.http.post(this.conf.serverUrl + 'savesubscription',
  		{ subscription: pushSubscription },
  		{
  			withCredentials: true,
  			responseType: 'text'
  			// ,
  			// headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
  		})
  		.pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
  	let message: string | number;
	  
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    // message = 'An error occurred:'+ error.error.message
	    message = 'A client-side or network error occurred';
	  } else {
	    // The backend returned an unsuccessful response code.
	    // code =  error.status
      // body = error.error
	    message = error.status;
	  }
	  return throwError(message);
	};
}
