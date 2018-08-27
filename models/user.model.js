const mongoose = require('mongoose');

// WARNING: Be carefull editing model -
// compare it with fields returned to user
// in notes.server.config.js userFields property
var userSchema = mongoose.Schema({
  userId: String,
  username: String,
  hashedPassword: String,
  notes: {
  	veryImportant: [{
  		description: String,
  		notificationDate: Date,
  	}],
  	alsoImportant: [{
  		description: String,
  		notificationDate: Date
  	}],
  	waitALittle: [{
  		description: String,
  		notificationDate: Date
  	}],
  	later: [{
  		description: String,
  		notificationDate: Date
  	}]
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;