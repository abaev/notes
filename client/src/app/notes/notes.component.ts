import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
	currentNotesNum: number;

  constructor(private userService: UserService,
  	private conf: ConfigService
  ) {	
  		this.user = new User;
  }

  ngOnInit() {
  	this.getNotes();
  	this.currentNotesNum = 0;
  }


  deleteNote(noteType, index) {
  	let userToSend;
  	
  	this.user.notes[noteType].splice(index, 1);
  	userToSend = this.user;
  	
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
  	}, error => { this.notesError = this.errorMessage(error)	});
  }


  updateNote(noteType, index, note) {
  	let userToSend;
  	
  	this.user.notes[noteType][index] = note;
  	userToSend = this.user;
  	
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
  	}, error => { this.notesError = this.errorMessage(error)	});
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
  	}, error => { this.notesError = this.errorMessage(error)	});
  }

  selectControlClass(m: number): void {
  	// 4 kinds of notes = 4 values
  	// for this.currentNotesNum (0, 1, 2 and 3)
  	// that defines class names for changing conrols
  	// colors in xs carousel mode 
  	let t: number = this.currentNotesNum + m;
  	if(t < 0) t = 4 + m;
  	this.currentNotesNum = t % 4;
  }

  onSwipe(id: string): void {
  	document.getElementById(id).click();
  }

  errorMessage(error: number): string;
  errorMessage(error: number): number;
  errorMessage(error: number): any {
  	switch (error) {
			case 500:
				return 'Sorry, server error. Try again later';
			case 403:
				return 'Forbidden';
			case 400:
				return 'Bad request';
			case 0:
				return 'Something bad happened, please try again later';
			default:
				return error;
		}
  }
}
