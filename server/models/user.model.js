const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userId: String,
  username: String,
  hashedPassword: String,
  notes: {
  	veryImportant: [{
  		description: String,
  		notificationDate: Date
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

// userSchema.options.toObject = {};
// userSchema.options.toObject.transform = function (doc, ret, options) {
//   // Remove the hashedPassword, _id, and __v of every document
//   // before returning the result (for send to client, for examle)
//   delete ret.hashedPassword;
//   delete ret._id;
//   delete ret.__v;

//   return ret;
// }

var User = mongoose.model('User', userSchema);

module.exports = User;