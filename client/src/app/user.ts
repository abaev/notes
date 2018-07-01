export class User {
	userId: string;
  username: string;
  notes: {
  	veryImportant: [{
  		description: string,
  		notificationDate: Date
  	}],
  	alsoImportant: [{
  		description: string,
  		notificationDate: Date
  	}],
  	waitALittle: [{
  		description: string,
  		notificationDate: Date
  	}],
  	later: [{
  		description: string,
  		notificationDate: Date
  	}]
  }
}
