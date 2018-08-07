import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

	@Input() note: Note;
	@Input() noteClass: string;
	@Output() onDeleteNote: EventEmitter<any> = new EventEmitter();
	@Output() onUpdateNote: EventEmitter<any> = new EventEmitter();

	descMaxLength = 140;

	constructor() {
		
	}

	ngOnInit() {
  	if(!this.note) this.note = {};
  }

	deleteNote() {
		this.onDeleteNote.emit();
	}

	updateNote($event?: any) {
		// Check length of note.discription
		// and save the note if necessary (in case of blur or
		// press ENTER events)
		
		// TODO: save note.notificationDate as Date
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
		if(!$event || keyCode == 13) {
			this.onUpdateNote.emit(this.note);
		}
	}


	onDateSelect($event: any): void {
		console.log($event);
		// Note: this should change in the near future with
		// using native Date for all public APIs
		// Datepicker uses NgbDateStruct as a model and not the
		// native Date object. It's a simple data structure
		// with 3 fields. Also note that months start with 1
		this.note.notificationDate = new Date(
			$event.year, $event.month - 1, $event.day);

		this.updateNote();
	}


	onDateClear() {
		delete this.note.notificationDate;
		this.updateNote();
	}
}
