const conf = {
	listenPort: 3000,
	mongodbUrl: 'mongodb://localhost:27017',
	notesUrl: 'https://notes12.herokuapp.com',
	saltRounds: 10,
	// Max length of description property in User.notes object
	descLength: 140,
	userFields: 'userId username notes veryImportant alsoImportant waitALittle later',
	userFieldsAll: 'userId username notes veryImportant alsoImportant waitALittle later timezone subscriptions',
	publicKey: 'BLKiaMyZkLt3pPP5Oxn5j8Eyx-K-CWwDujfhRGHtmPUpEjgsAprxKYCCublRZLKQAZz-PkFYlfFu67Hgv-Qjhwo',
	appMailto: 'mailto:lowrydertrue@gmail.com',
	iconForPush: 'https://notes12.herokuapp.com/assets/icons/icon-128x128.png'
}

module.exports = conf;