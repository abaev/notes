const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const enforce = require('express-sslify');

// MongoDB session store
const MongoStore = require('connect-mongo')(session);

const uuidv4 = require('uuid/v4');

// Own dependencies (not npm modules)
const conf = require('./notes.server.config.js');
const User = require('./models/user.model.js');
const userCtrl = require('./user.controller.js');
const secret = require('./notes.server.secret.js');


const app = express();

// For Node (being behind Heroku) can produce
// a Set-Cookie response header when cookie : { secure: true}
app.set('trust proxy', 1);

// For security reasons too
app.disable('x-powered-by');

// Redirect HTTP to HTTPS
// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku)
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// NOTE: app.get('env') === 'development' (=== 'production' )
// NOTE: bcrypt requires for user password must be <= 72 symbols


// Connecting to MongoDB via mongoose
mongoose.connect(process.env.MONGOLAB_URI || conf.mongodbUrl,
  {autoIndex: false})
    .then(() => {
  		console.log(`Succesfully connected to the MongoDB at URL: ${process.env.MONGOLAB_URI || conf.mongodbUrl}`);
  	}, err => { 
  		console.error(`Error connecting to the MongoDB at URL: ${process.env.MONGOLAB_URI || conf.mongodbUrl}`);
  	}
  );


// Allow CORS
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
    // Prevent possible vulnerability by using username == null
    // and password == null (I setting null to username and password
    // in case of Google OAuth)
    if(username === null && password === null){
    	done(null, false, { message: 'Incorrect username/password' });
    }

    User.findOne( { username: username} ).exec().then(user => {
      // Or should I use asynchronous version bcrypt.compare??
      if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        return done(null, false, { message: 'Incorrect username/password' });
      }
            
      return done(null, user);
    }, err => {
    	console.error('DB error');
  		return done(err); 
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://notes12.herokuapp.com/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Find or create user
    User.findOne( { userId: profile.id} ).exec().then(user => {
      if (!user) { // Create new user
        let newUser = new User({
				  userId: profile.id,
				  username: null,
				  hashedPassword: null
				});

				newUser.save().then(createdUser => {
					return done(null, createdUser);
				}, err => {
					console.error('DB error');
		  		return done(err);
				});
      } else {
      	return done(null, user);
      }
      
      
    }, err => {
    	console.error('DB error');
  		return done(err); 
    });
  }
));


// Tell passport how to serialize/deserialize the user
passport.serializeUser((user, done) => {
  if(user) {
  	done(null, user.userId);
  } else {
  	done(null, false);
  }
});


passport.deserializeUser((id, done) => {
  User.findOne( { userId: id} ).exec().then(user => {
  	if (!user) {
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
app.use(bodyParser.json());


app.use( express.static(path.join(__dirname, 'public')) );


app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: secret,
  // TODO: Set cookie: {} in recomended values when use HTTPS
	resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.use(passport.initialize());
app.use(passport.session());


app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if(err) return next(err);
    if(!user) return next( { statusCode: 403, message: info.message } );
    
    req.login(user, err => {
    	if(err) return next(err);
    
      return res.status(200).send();
    })
  })(req, res, next);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), /*/login*/
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.get('/logout', (req, res) => {
  if(req.isAuthenticated()) {
		req.logout();
	  res.send();
	} else res.status(400).send('Bad request');
});


app.post('/adduser', userCtrl.add);

app.delete('/deleteuser', userCtrl.deleteUser);

app.get('/notes', userCtrl.get);

app.put('/updatenotes', userCtrl.update);

app.post('/savesubscription', userCtrl.saveSubscription);

app.put('/deletesubscription', userCtrl.deleteSubscription);

app.get('/subscriptions', userCtrl.getSubscriptions);


// Error handling middleware
app.use((err, req, res, next) => {
	let errStack;

	console.error(err);

	if(app.get('env') === 'development') errStack = err;
	
	res.status(err.statusCode || 500)
		.send(errStack || err.message || 'Internal server error');
});


app.listen(process.env.PORT || conf.listenPort, () => {
	console.log(`Server listen to: ${process.env.PORT || conf.listenPort}`);
});


// Start looking over DB for sending push notifications
userCtrl.findAndSendIterator();