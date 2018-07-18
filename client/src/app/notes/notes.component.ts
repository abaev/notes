import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router }  from '@angular/router';

import { User } from '../user';
import { ConfigService } from '../config.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	user: User;
	notesError: string;

  constructor(private userService: UserService,
  	private conf: ConfigService
  ) {
  		this.user = new User;
  }

  ngOnInit() {
  	this.getNotes();
  }

  deleteNote(noteType, index) {
  	let userToSend = this.user;
  	console.log(`Deleting note ${index} from ${noteType}`);
  	this.user.notes[noteType].splice(index, 1);
  	
  	// Deleting null elements from notes arrays
  	// for pass validation on server
  	for(let k in userToSend.notes) {
  		for(let i = 2; i >= 0; i--) {
				if(userToSend.notes[k][i] === null) {
					userToSend.notes[k].splice(i, 1);
				}
			}
  	}

  	this.userService.updateUser(userToSend).subscribe(res => {
  		this.getNotes();
  	}, error => {
  			switch (error) {
  				case 500:
  					this.notesError = 'Sorry, server error. Try again later';
  					break;
  				case 403:
  					this.notesError = 'Forbidden';
  					break;
  				case 400:
  					this.notesError = 'Bad request';
  					break;
  				case 0:
  					this.notesError = 'Something bad happened, please try again later';
  					break;
  				default:
  					this.notesError = error;
  					break;
  			}
			});

  }

  private getNotes(): void {
  	this.userService.getNotes().subscribe(res => {
  		// Adding null elments to arrays while it length
  		// will reach 3, for displaying empty notes to user 
  		Object.keys((new User()).notes).forEach((k) => {
  			if(!res.notes[k]) res.notes[k] = [];
  			for(let i = 0; i < 3; i++) {
  				if(!res.notes[k][i]) res.notes[k].push(null);
  			}
  		})

  		this.user = res;
  		console.log(`user = ${JSON.stringify(this.user)}`);
  	}, error => {
  			switch (error) {
  				case 500:
  					this.notesError = 'Sorry, server error. Try again later';
  					break;
  				case 403:
  					this.notesError = 'Forbidden';
  					break;
  				case 0:
  					this.notesError = 'Something bad happened, please try again later';
  					break;
  				default:
  					this.notesError = error;
  					break;
  			}
  		});
  }

}
