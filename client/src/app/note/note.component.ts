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

	deleteNote() {
		this.onDeleteNote.emit();
	}


  constructor() { }

  ngOnInit() { 
  }

}
