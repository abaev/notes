import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
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
  	}).pipe(catchError(this.handleError));
  }


  getNotes(): Observable<User> {
  	return this.http.get(this.conf.serverUrl + 'notes')
  		.pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
  	let message;
	  
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
	  return new ErrorObservable(message);
	};
}
