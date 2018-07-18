import { Note } from './note'

export class User {
	userId: string;
  username: string;
  notes?: {
  	veryImportant?: Note[],
  	alsoImportant?: Note[],
  	waitALittle?: Note[],
  	later?: Note[]
  }

  constructor() {
  	this.notes = {
  		veryImportant: [],
	  	alsoImportant: [],
	  	waitALittle: [],
	  	later: []
  	};
  }
}

