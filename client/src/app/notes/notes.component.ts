import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router }  from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as moment from 'moment-timezone';

import { User } from '../user';
import { ConfigService } from '../config.service';
import { UserService } from '../user.service';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';
import { DeleteAccConfirmService } from '../delete-acc-confirm.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	user: User;
	notesError: string;
	currentNotesNum: number;
	isIOS: boolean; 
	isLoading: boolean; // For showing fading N while loading

	constructor(private userService: UserService,
  	private conf: ConfigService,
  	private router: Router,
  	private modalService: NgbModal,
  	private deleteAccConfirmService: DeleteAccConfirmService,
  	private deviceService: DeviceDetectorService
  ) {	
  		this.user = new User;
  		
  		// deleteAccConfirmService.deleteConfirmed$.subscribe(() => {
    // 		this.deleteAccount();
	  	// });

  }

  ngOnInit() {
  	// For allow vertical scroll on iOS devices
  	// (but we lose swipe this way)
  	this.isIOS = /ipad|iphone|ipod/i.test(this.deviceService.device);
  	this.getNotes(true);
  	this.currentNotesNum = 0;

  	this.deleteAccConfirmService.deleteConfirmed$.subscribe(() => {
  		this.deleteAccount();
  	});
  }


  onDeleteNote(noteType, index) {
  	let userToSend;
  	
  	this.user.notes[noteType].splice(index, 1);
  	userToSend = this.user;
  	
  	// Deleting null elements from notes arrays
  	// for pass validation on server
  	userToSend.notes = this.formatNotesToSend(userToSend.notes);
  	
  	this.isLoading = true;
  	this.userService.updateUser(userToSend).subscribe(res => {
  		this.getNotes();
  	}, error => { 
  			this.isLoading = false;
  			this.notesError = this.errorMessage(error);
  		});
  }


  onUpdateNote(noteType, index, note) {
  	let userToSend;
  	
  	this.user.notes[noteType][index] = note;
  	userToSend = this.user;
  	
  	// Deleting null elements from notes arrays
  	// for pass validation on server
  	userToSend.notes = this.formatNotesToSend(userToSend.notes);
  	
  	this.isLoading = true;
  	
  	this.userService.updateUser(userToSend).subscribe(res => {
  		this.getNotes();
  	}, error => { 
	  		this.isLoading = false;
	  		this.notesError = this.errorMessage(error)
	  	});
  }


  private getNotes(isInint?: boolean): void {
  	this.isLoading = true;
  	this.userService.getNotes().subscribe(res => {
  		this.isLoading = false;
  		
  		// Adding null elments to arrays while it length
  		// will reach 3, for displaying empty notes to user 
  		Object.keys((new User()).notes).forEach((k) => {
  			if(!res.notes[k]) res.notes[k] = [];
  			for(let i = 0; i < 3; i++) {
  				if(!res.notes[k][i]) res.notes[k].push(null);
  				
  				// Transform note.notificationDate: string to
  				// note.notificationDate: Date
  				if(res.notes[k][i] && res.notes[k][i].notificationDate) {
  					res.notes[k][i].notificationDate = 
  						new Date(res.notes[k][i].notificationDate);
  				}
  			}
  		})

  		this.user = res;
  		
  		// TODO: Make POST request to send user.timezone,
  		// for app have updated info about user timezone
  		// (even when user has changed timezone)
  		this.user.timezone = moment.tz.guess();
  	}, error => { 
  		// In case of first attempt to load notes status 403
  		// obviosly mean that user not log in yet
  		if(isInint && error === 403) this.router.navigateByUrl('login');
  		
  		this.isLoading = false;
  		this.notesError = this.errorMessage(error)
  	});
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

  // TODO: Delete this??
  onSwipe(id: string): void {
  	document.getElementById(id).click();
  }


  logout() {
  	this.userService.logout().subscribe(res => {
  		this.router.navigateByUrl('login');
  	},
  		error => { 
  			this.notesError = this.errorMessage(error)
  		});
  }

  deleteAccount() {
  	this.userService.deleteAccount().subscribe(res => {
  		this.router.navigateByUrl('login');
  	},
  		error => { 
  			this.notesError = this.errorMessage(error)
  		});
  }

  openModal() {
    const modalRef = this.modalService
    	.open(DeleteAccountModalComponent, { centered: true });
  }

  onSubscriptionError($event) {
  	this.notesError = this.errorMessage($event);
  }


  private errorMessage(error: number): string;
  private errorMessage(error: number): number;
  private errorMessage(error: string): string;
  private errorMessage(error: any): any {
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


  private formatNotesToSend(notes: any): any {
  	// Deleting null elements from notes arrays
  	// for pass validation on server
  	for(let k in notes) {
  		for(let i = 2; i >= 0; i--) {
				if(notes[k][i] === null) {
					notes[k].splice(i, 1);
				}
			}
  	}

  	return notes;
  }
}
