import { Component, OnInit, EventEmitter, Input, Output, DoCheck } from '@angular/core';
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

  ngDoCheck() {
  	// this.note.description = this.sliceDescription(this.note.description, 10);
  	// console.log(this.note.description);
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
		this.note.description = this.note.description.slice(0, this.descMaxLength);

		// $event.which - for FireFox
		if($event) keyCode = $event.which || $event.keyCode;
		// Emit on blur or press Enter events
		if(!$event || keyCode == 13) {
			this.onUpdateNote.emit(this.note);
		}
	}
}
