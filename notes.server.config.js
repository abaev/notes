const conf = {
	listenPort: 3000,
	mongodbUrl: 'mongodb://localhost:27017',
	notesUrl: 'https://notes12.herokuapp.com',
	saltRounds: 10,
	// Max length of description property in User.notes object
	descLength: 140,
	userFields: 'userId username notes veryImportant alsoImportant waitALittle later'
}

module.exports = conf;