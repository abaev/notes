const conf = {
	listenPort: 3000,
	mongodbUrl: 'mongodb://localhost:27017',
	notesUrl: 'https://notes12.herokuapp.com',
	saltRounds: 10,
	// Max length of description property in User.notes object
	descLength: 140,
	userFields: 'userId username notes veryImportant alsoImportant waitALittle later',
	publicKey: 'BLKiaMyZkLt3pPP5Oxn5j8Eyx-K-CWwDujfhRGHtmPUpEjgsAprxKYCCublRZLKQAZz-PkFYlfFu67Hgv-Qjhwo',
	appMailto: 'mailto:lowrydertrue@gmail.com'
}

module.exports = conf;