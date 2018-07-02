import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router }  from '@angular/router';

import { User } from '../user';
import { ConfigService } from '../config.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: User;
	loginError: string;
	userInputError: string;
	username: string;
	password: string;

	constructor(private userService: UserService,
  	private conf: ConfigService,
  	private router: Router) { }

  ngOnInit() {
  }
	
	login(): void {
		// In login form Submit button is disabled if user don't filled
		// all fields, but this works only if user interacts with form.
		// (Since I guess that to show disabled Submit button to user at page
		// loaded it's bad idea). So, we should check, that user don't click
		// Subbmit at first time, before makes any actions with form.
		if(!this.username || !this.password) {
			this.userInputError = 'Please, type your username and password';
			return;
		}

		this.userInputError = null;
		this.userService.login(this.username, this.password)
			.subscribe(res => {
				this.router.navigateByUrl('notes');
  		}, error => {
  			switch (error) {
  				case 403:
  					this.loginError = 'Incorrect username/password';
  					break;
  				case 500:
  					this.loginError = 'Sorry, server error. Try again later';
  					break;
  				case 0:
  					this.loginError = 'Something bad happened, please try again later';
  					break;
  				default:
  					this.loginError = error;
  					break;
  			}
  		});;
	}
}
