import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Note } from '../note';
import { ConfigService } from '../config.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

	@Input() note: Note;
	@Input() noteClass: any;
	@Input() noteSpec: any;
	@Output() deleteNote: EventEmitter<any> = new EventEmitter();
	@Output() updateNote: EventEmitter<any> = new EventEmitter();

	private time: NgbTimeStruct;
	descMaxLength = this.configService.descMaxLength;
	// Needed for prevent calling updNote() twice on one event
	private firedByUser: boolean = true; 

	constructor(private configService: ConfigService) {
	}

	ngOnInit() {
  	if(!this.note) this.note = {};
  }

	delNote() {
		this.deleteNote.emit();
	}

	updNote($event?: any) {
		// Check length of note.discription
		// and save the note if necessary (in case of blur or
		// press ENTER events)
		
		let keyCode: number;
		
		if($event && $event.clipboardData) {
			// Making description not longer than this.descMaxLength
			// in case of paste from clipboard, after that just exit
			$event.preventDefault();
			$event.target.textContent = $event.clipboardData.getData('text/plain')
				.slice(0, this.descMaxLength);

			return;
		}
		
		// Making description not longer than this.descMaxLength
		if (this.note.description 
			&& this.note.description.length >= this.descMaxLength) {
			this.note.description =
				this.note.description.slice(0, this.descMaxLength);
		}
		

		// $event.which - for FireFox
		if($event) keyCode = $event.which || $event.keyCode;
		// Emit on blur or press Enter events
		if((!$event || keyCode == 13) && this.firedByUser) {
			// Prevent calling updNote() twice, when blur fired by
			// browser after keydown, or vice versa (keydown after blur)
			this.firedByUser = false;
			setTimeout(() => { this.firedByUser = true }, 500);
			this.updateNote.emit(this.note);
		}
	}


	onDateSelect($event: NgbDateStruct): void {
		// Note: this should change in the near future with
		// using native Date for all public APIs
		// Datepicker uses NgbDateStruct as a model and not the
		// native Date object. It's a simple data structure
		// with 3 fields. Also note that months start with 1
		this.note.notificationDate = new Date(
			$event.year, $event.month - 1, $event.day);

		this.updNote();
	}


	clearNotification() {
		delete this.note.notificationDate;
		this.updNote();
	}

	
	selectDateTime() {
		// Updating note.notificationDate and toggle disabled property

		// Timepicker have not select event,
		// so updating note.notificationDate here
		if(this.time) {
			let date = this.note.notificationDate;
			
			this.note.notificationDate = new Date(
				date.getFullYear(),	date.getMonth(), date.getDate(),
				this.time.hour, this.time.minute, 0, 0);

			this.updNote();
		}
	}

}
