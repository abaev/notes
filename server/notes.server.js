const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const morgan = require('morgan');

// MongoDB session store
const MongoStore = require('connect-mongo')(session);

const uuidv4 = require('uuid/v4');

// Own dependencies (not npm modules)
const conf = require('./notes.server.config.js');
const User = require('./models/user.model.js');
const userCtrl = require('./user.controller.js');

const app = express();

// NOTE: app.get('env') === 'development' (=== 'production' )
// NOTE: bcrypt requires for user password must be <= 72 symbols

// TODO: Use Helmet and other methods for security 
// http://expressjs.com/ru/advanced/best-practice-security.html

// Connecting to MongoDB via mongoose
mongoose.connect(conf.mongodbUrl).then(() => {
		console.log(`Succesfully connected to the MongoDB at URL: ${conf.mongodbUrl}`);

		// TODO: Delete this
		// List of users		
		User.find({}).exec().then(users => {
			console.log(`List of users:\n`);
			for (let i = 0; i < users.length; i++) {
				console.log(`${users[i].username}\n`);
			}
		}, err => { return console.error(err); });

	}, err => { 
		console.error(`Error connecting to the MongoDB at URL: ${conf.mongodbUrl}`);
	}
);


// Allow CORS
// TODO: Delete this, in production server
// and client side will be the same origin
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 
    conf.notesUrl);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials',
    'true');
  res.header('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.options('/*', (req, res, next) => {
  res.status(200).send();
});


// Configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  // Optional, defaults to 'username' and 'password'
  // { usernameField: 'email',
  //   passwordField: 'passwd', },
  (username, password, done) => {
    console.log('Inside local strategy callback');
        
    User.findOne( { username: username} ).exec().then(user => {
      // Or should I use asynchronous version bcrypt.compare??
      if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        console.log('Incorrect username/password');
        return done(null, false, { message: 'Incorrect username/password' });
      }
            
      return done(null, user);
    }, err => {
    	console.error('DB error');
  		return done(err); 
    });
  }
));


// Tell passport how to serialize/deserialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  if(user) {
  	done(null, user.userId);
  } else {
  	done(null, false);
  }
});


passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  
  User.findOne( { userId: id} ).exec().then(user => {
  	if (!user) {
    	console.log(`There are no user with userId = ${id}`);
      return done(null, false, { message: `There are no such user` });
    }
    
    return done(null, user);
  }, err => {
  	console.error('DB error');
  	// May be return next(err) will be better way,
  	// than we respond to client that error ocured 
		return done(err);
  });
});


// For Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// For Content-Type: application/json
// TODO: Delete this in production
app.use(bodyParser.json());


app.use( express.static(path.join(__dirname, 'public')) );


app.use(session({
  // genid: (req) => {
  //   console.log('Inside the session middleware');
  //   console.log(req.sessionID);
  //   return uuidv4(); // use UUIDs for session IDs
  // },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // TODO: Make secret secret 
  // http://pmuellr.blogspot.com/2014/09/keeping-secrets-secret.html
  secret: 'keyboard cat',
  // TODO: Set cookie: {} in recomended values when use HTTPS
	resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


app.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  console.log(`req.body = ${JSON.stringify(req.body)}`);
  console.log(`req.body.username = ${req.body.username}`);
  console.log(`req.body.password = ${req.body.password}`);
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);

    if(err) return next(err);
    if(!user) return next( { statusCode: 403, message: info.message } );
    
    req.login(user, err => {
    	if(err) return next(err);
      console.log('Inside req.login() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
      console.log(`req.user: ${JSON.stringify(req.user)}`);
    
      return res.status(200).send();
    })
  })(req, res, next);
});


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


app.post('/adduser', userCtrl.add);

app.delete('/deleteuser', userCtrl.deleteUser);

app.get('/notes', userCtrl.get);

app.put('/updatenotes', userCtrl.update);

// TODO: Delete this
app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback')
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  console.log(`req.sessionID = ${req.sessionID}`)
  console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
  console.log(`req.user: ${JSON.stringify(req.user)}`)
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})


// Error handling middleware
app.use((err, req, res, next) => {
	let errStack;

	console.error(err);

	if(app.get('env') === 'development') errStack = err;
	
	res.status(err.statusCode || 500)
		.send(errStack || err.message || 'Internal server error');
});


app.listen(conf.listenPort, () => {
	console.log(`Server listen to :${conf.listenPort}`);
});