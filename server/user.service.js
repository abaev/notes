// Simple actions with DB for use in user.controller.js module

const User = require('./models/user.model.js');
const conf = require('./notes.server.config.js');
module.exports.get = get;
module.exports.update = update;
module.exports.add = add;
module.exports.deleteUser = deleteUser;


async function get(conditions){
	let user;

	try {
		user = await User.findOne(conditions)
			// Include only necessary fields,
			// without mongooose (or MongoDB?) service fields,
			// like _id, and __v and others
			.select('-_id') 
			.select(conf.userFields).lean().exec();
		return user;
	} catch(err) {
		throw new Error('Error occured while getting user');
	}
}


async function update(user) {
	try {
		await User.findOneAndUpdate({ userId: user.userId }, user).exec();
	
	} catch(err) {
		throw new new Error('Error ocured while updating user');
	}
}


async function add(user) {
	try {
		await user.save();
		
	} catch(err) {
		throw new Error('Error ocured while adding new user');
	}
}


async function deleteUser(userId) {
	try {
		await User.remove({ userId: userId });
	} catch(err) {
		return next(err);
	}
}