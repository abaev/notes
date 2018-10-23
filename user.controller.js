// This module make CRUD operations (accordind with
// user permissions and app own logic) and 
// sending push notifications

const User = require('./models/user.model.js');
const Joi = require('joi');
const passport = require('passport');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const webpush = require('web-push');
const moment = require('moment-timezone');

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
module.exports.findAndSendIterator = findAndSendIterator;


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

	const validTimezone = Joi.string();

	if(!req.isAuthenticated()) {
		return next({ statusCode: 403, message: 'Forbidden' });
	}

	// Do validation
	if(validNotes.validate(req.body.notes).error
		&& validTimezone.validate(req.body.timezone).error) {
			return next({ statusCode: 400, message: 'Bad request'});
	}

	// Updating user
	updatedUser = {
		userId: req.user.userId,
		notes: req.body.notes,
		timezone: req.body.timezone
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
	// subscription = {
	//   keys: {
	//       p256dh: 'BBrDNSwKgGa8TtELhnLuSBkcJMrhbBMgd2sRtZhtEL_7IGgcm_U2w_RCe5WMev01-B0BIXjob8KN-6YlVru2vh0',
	//       auth: 'aQtHAXiBtmte7k6eaX_EBQ'
	//   },
	//   endpoint: 'https://fcm.googleapis.com/fcm/send/e5wt3WixQdc:APA91bH6ehdubZAyzeFuCxjfXtr9CdOfDenYiz0WsYojJW2q5Llq4P4sYNTRClEaUc5axoYdA_VD5Aoq4rnwUPke7qNu4auHw7C1VVOoT7TpujCtSCdaB0ht9WF4V66ID91c6YwZxxba'
 //  }

 //  data = {
 //  	notification: {
 //  		title: 'First automatically push',
 //  		body: 'Yoohoo!!',
 //  		icon: 'https://notes12.herokuapp.com/assets/icons/icon-128x128.png'
 //  	}
 //  }

  // title > 60 symbols
  // body > 135 symbols

	try {
	 	await webpush.sendNotification(subscription, JSON.stringify(data));
	 } catch(err) {
	 		// TODO: Check the Status Code, if 404 or 410
	 		// the subscription should be removed from application server.
	 		// Client should to resubscribe the user
	 		// https://developers.google.com/web/fundamentals/push-notifications/web-push-protocol
	 		console.error(err);
	 } 
}

function findAndSendIterator () {
	let delayBeforeStart, now, users, notificationDate, data, title;
	
	// Define time to start (to start at 00 seconds)
	delayBeforeStart = 60 - Math.floor(Date.now() / 1000) % 60;
	
	setTimeout(() => {
		
		setInterval(async function() {
			// TODO: Delete this
			console.log(`Iteration started at: ${JSON.stringify(new Date(Date.now()))}`);
			
			now = moment(new Date(Date.now()));

			try {
				users = await userServ.getAll();
				
				users.forEach(user => {
					
					for(noteType in user.notes) {
						for(i = 0; i < user.notes[noteType].length; i++) {
							notificationDate = user.notes[noteType][i].notificationDate;

							if(notificationDate) {
								notificationDate = 
									moment.tz(user.notes[noteType][i].notificationDate, user.timezone);
							
								if(now.isSame(notificationDate, 'minute')) {
									switch (noteType) {
										case 'veryImportant':
											title = 'Very important';
											break;
										
										case 'alsoImportant':
											title = 'Also important';
											break;
										
										case 'waitALittle':
											title = 'Wait a little';
											break;
										
										case 'later':
											title = 'Later';
											break;
									}
									
									data = {
								  	notification: {
								  		title: 'Notes - '+ title,
								  		body: user.notes[noteType][i].description,
								  		icon: conf.iconForPush,
								  		badge: conf.badgeForPush
								  	}
								  }
									
									user.subscriptions.forEach( subscription =>  {
										sendNotification(subscription, data);
									});
								}
							}
						}
					}

				});
			
			} catch(err) {
				console.error(err);
			}

		}, 60*1000); 
	
	}, delayBeforeStart * 1000);
}