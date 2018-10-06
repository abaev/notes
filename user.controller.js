// This module make CRUD operations, accordind with
// user permissions and app own logic

const User = require('./models/user.model.js');
const Joi = require('joi');
const passport = require('passport');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const userServ = require('./user.service.js');
// const deepCopy = require('deepcopy');

const conf = require('./notes.server.config.js');

module.exports.get = get;
module.exports.update = update;
module.exports.add = add;
module.exports.deleteUser = deleteUser;
module.exports.saveSubscription = saveSubscription;


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

	// const validNotes = Joi.object({
	// 	veryImportant: Joi.array().items(Joi.object({
	// 		description: Joi.string().max(conf.descLength),
	// 		notificationDate: Joi.date()
	// 	}).with('notificationDate', 'description')).max(3),

	// 	alsoImportant: Joi.array().items(Joi.object({
	// 		description: Joi.string().max(conf.descLength),
	// 		notificationDate: Joi.date()
	// 	}).with('notificationDate', 'description')).max(3),

	// 	waitALittle: Joi.array().items(Joi.object({
	// 		description: Joi.string().max(conf.descLength),
	// 		notificationDate: Joi.date()
	// 	}).with('notificationDate', 'description')).max(3),

	// 	later: Joi.array().items(Joi.object({
	// 		description: Joi.string().max(conf.descLength),
	// 		notificationDate: Joi.date()
	// 	}).with('notificationDate', 'description')).max(3)
	// });

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
			{ allowUnknown: true } ).error) {
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