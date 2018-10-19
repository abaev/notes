// Simple actions with DB for use in user.controller.js module

const User = require('./models/user.model.js');
const conf = require('./notes.server.config.js');
module.exports.get = get;
module.exports.update = update;
module.exports.add = add;
module.exports.deleteUser = deleteUser;
module.exports.saveSubscription = saveSubscription;
module.exports.deleteSubscription = deleteSubscription;
module.exports.getAll = getAll;


async function get(conditions){
	let user;

	try {
		user = await User.findOne(conditions)
			// Include only necessary fields,
			// without mongooose (or MongoDB?) service fields,
			// like _id, and __v and others
			.select('-_id') 
			.select(conf.userFields).lean().exec();
		
		// Delete ALL '_id' fields from doc
		user = _deleteProperty(user, '_id');
		return user;
	} catch(err) {
		throw new Error('Error occured while getting user');
	}
}


async function getAll(){
	let users;

	try {
		users = await User.find()
			// Include only necessary fields,
			// without mongooose (or MongoDB?) service fields,
			// like _id, and __v and others
			.select('-_id') 
			.select(conf.userFieldsAll).lean().exec();
		
		// Delete ALL '_id' fields from doc
		users = users.map( user => _deleteProperty(user, '_id'));
		
		return users;
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


async function saveSubscription(userId, subscription) {
	let user;

	try {
		user = await User.findOne({ userId: userId}).exec();
		user.subscriptions.push(subscription);
		await user.save();
	} catch(err) {
		throw new Error('Error occured while saving subscription');
	}
}

async function deleteSubscription(userId, subscriptionEndpoint) {
	let user;

	try {
		user = await User.findOne({ userId: userId}).exec();
		user.subscriptions = user.subscriptions.filter(e => {
			return e.endpoint != subscriptionEndpoint;
		});

		await user.save();
	} catch(err) {
		throw new Error('Error occured while deleting subscription');
	}
}


function _deleteProperty(obj, key) {
	for(let k in obj) {
		if(k === key) {
			delete obj[k];
		} else if(typeof obj[k] === 'object') _deleteProperty(obj[k], key);
	}

	return obj;
}
