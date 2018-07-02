const conf = {
	listenPort: 3000,
	mongodbUrl: 'mongodb://localhost:27017',
	notesUrl: 'http://localhost:4200',
	saltRounds: 10,
	// Max length of description property in User.notes object
	descLength: 10,
	userFields: 'userId username notes veryImportant alsoImportant waitALittle later'
}

module.exports = conf;