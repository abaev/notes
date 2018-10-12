// This module make CRUD operations (accordind with
// user permissions and app own logic) and 
// sending push notifications

const User = require('./models/user.model.js');
const Joi = require('joi');
const passport = require('passport');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const webpush = require('web-push');

const userServ = require('./user.service.js');

const conf = require('./notes.server.config.js');

const vapidKeys = {
  publicKey: conf.publicKey,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

webpush.setVapidDetails(
  conf.appMailto,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports.get = get;
module.exports.update = update;
module.exports.add = add;
module.exports.deleteUser = deleteUser;
module.exports.saveSubscription = saveSubscription;
module.exports.deleteSubscription = deleteSubscription;
module.exports.sendNotification = sendNotification;


async function get(req, res, next) {
	let user;

	if(!req.isAuthenticated()) {
		return next({ statusCode: 403, message: 'Forbidden' });
	}

	try {
		user = await userServ.get({ userId: req.user.userId });
		res.status(200).send(user);
	} catch(err) {
		return next(err);
	}
}


async function update (req, res, next) {
	let updatedUser;

	// Define validation object
	const validNotes = Joi.object({
		veryImportant: Joi.array().items(Joi.object({
			description: Joi.string().allow('').max(conf.descLength),
			notificationDate: Joi.date()
		})).max(3),

		alsoImportant: Joi.array().items(Joi.object({
			description: Joi.string().allow('').max(conf.descLength),
			notificationDate: Joi.date()
		})).max(3),

		waitALittle: Joi.array().items(Joi.object({
			description: Joi.string().allow('').max(conf.descLength),
			notificationDate: Joi.date()
		})).max(3),

		later: Joi.array().items(Joi.object({
			description: Joi.string().allow('').max(conf.descLength),
			notificationDate: Joi.date()
		})).max(3)
	});

	if(!req.isAuthenticated()) {
		return next({ statusCode: 403, message: 'Forbidden' });
	}

	// Do validation
	if(validNotes.validate(req.body.notes).error) {
		return next({ statusCode: 400, message: 'Bad request'});
	}

	// Updating user
	updatedUser = {
		userId: req.user.userId,
		notes: req.body.notes
	};

	try {
		await userServ.update(updatedUser);
		return res.status(200).send();
	
	} catch(err) {
		return next(err);
	}
}


async function add (req, res, next) {
	let user;
	let username = req.body.username;
	let password = req.body.password;
	// bcrypt requires for user password must be <= 72 symbols
	// Let's limit username length the same 72 symbols :)
	const validCredentials = Joi.string().max(72);
	
	if(req.isAuthenticated()) {
		req.logout();
	}
	
	if(validCredentials.validate(username).error) {
		return next( { statusCode: 400, message: 'Invalid username'} );
	}

	if(validCredentials.validate(password).error) {
		return next( { statusCode: 400, message: 'Invalid password'} );
	}

	try {
		user = await User.findOne({ username: username}).exec();
		// Check there are no user with
		// the same username yet, create and log in
		if (user) {
    	return next( { statusCode: 403,
      	message: 'This username already exsists, please choose other'} );
    }

    // Everything OK, creating and log in new user
    user = new User({ // creating
		  userId: uuidv4(),
		  username: username,
		  hashedPassword: bcrypt.hashSync(password, conf.saltRounds)
		});

		await userServ.add(user);

		passport.authenticate('local', (err, user, info) => {
	    if(err) return next(err);
	    if(!user) return next( { statusCode: 403, message: info.message } );
	    
	    req.login(user, err => {
	    	if(err) return next(err);
	      			    
	      return res.status(200).send();
	    })
	  })(req, res, next);

	} catch(err) {
		return next(err);
	}
}


async function deleteUser (req, res, next) {
	if(!req.isAuthenticated()) {
		return next({ statusCode: 403, message: 'Forbidden' });
	}

	try {
		await userServ.deleteUser(req.user.userId);
		req.logout();
		res.send('User was deleted');
	
	} catch(err) {
		return next(err);
	}
}


async function saveSubscription(req, res, next) {
	const validSubscription = Joi.object({
		endpoint: Joi.string(),
		keys: Joi.object({
			p256dh: Joi.string(),
			auth: Joi.string()
		})
	});

	if(!req.isAuthenticated()) {
		return next({ statusCode: 403, message: 'Forbidden' });
	}

	// Do validation
	if(validSubscription.validate(req.body.subscription,
			{ allowUnknown: true }).error) {
				console.error(`req.body.subscription = ${JSON.stringify(req.body.subscription)}`);
				return next({ statusCode: 400, message: 'Bad request'});
	}

	try {
		await userServ.saveSubscription(req.user.userId, req.body.subscription);
		return res.status(200).send();

	} catch(err) {
		return next(err);
	}
}


async function deleteSubscription (req, res, next) {
	if(!req.isAuthenticated()) {
		return next({ statusCode: 403, message: 'Forbidden' });
	}

	if(typeof req.body.subscriptionEndpoint != 'string') {
		return next({ statusCode: 400, message: 'Bad request'});
	}

	try {
		await userServ.deleteSubscription(req.user.userId, req.body.subscriptionEndpoint);
		return res.status(200).send();

	} catch(err) {
		return next(err);
	}
}


async function sendNotification(subscription, data) {
	// TODO: Delete this
	subscription = {
	  keys: {
	      p256dh: 'BL_DatsWaKKCON-8lRfcUGMisFp2Yk04EFnALsnRedfq1KX_4gB8pRmW7psugQkMFKoyrSRt6P-uEo0Nn9Oqbr8',
	      auth: '8L5SWgIiSWpv3CqGME-VPA'
	  },
	  endpoint: 'https://fcm.googleapis.com/fcm/send/f1mkym2Kg-Y:APA91bEduEjTjthogYy8J8IfELuf4t3Z4gQfBAiU3GxGt-RF1F9O3JMbdpBUStW941j7b9UzNAoj-be03e5L1XTJmf6Xxon-wlMz_zfbzy-xrJdM1BHDDWV6QovIjtMioeQukBv4sadI'
  }

  data = {
  	notification: {
  		title: 'First true push'
  	}
  }

	try {
	 	await webpush.sendNotification(subscription, data);
	 } catch(err) {
	 	console.error(err);
	 } 
}