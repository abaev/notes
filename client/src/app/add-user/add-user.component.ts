import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router }  from '@angular/router';

import { ConfigService } from '../config.service';
import { UserService } from '../user.service';
import { ErrorClasses } from '../error-classes';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	addUserError: string;
	userInputError: string;
	username: string;
	password: string;
	errorClasses: ErrorClasses;

  constructor(private userService: UserService,
  	private conf: ConfigService,
  	private router: Router
  ) {
			this.errorClasses = new ErrorClasses();
  }

  ngOnInit() {
  }

  addUser(): void {
  	// Submit button behavior like in Log in form:
  	// it's not disabled, if user don't interact with form yet.
  	// So, here the same check, as in login.component.ts
		if(!this.username || !this.password) {
			this.userInputError = 'Please, type your username and password';
			for(let k in this.errorClasses) this.errorClasses[k] = true;
						
			return;
		}

		this.userService.addUser(this.username, this.password)
			.subscribe(res => {
				this.router.navigateByUrl('notes');
  		}, error => {
  			switch (error) {
  				case 500:
  					this.addUserError = 'Sorry, server error. Try again later';
  					break;
  				case 400:
  					this.addUserError = 'Incorrect credentials. Try other username/password';
  					break;
  				case 403:
  					this.addUserError = 'This username already exsists, please choose other one';
  					break;
  				default:
  					this.addUserError = error;
  					break;
  			}
  		});;
	}
}
