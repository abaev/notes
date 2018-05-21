const conf = require('./notes.server.config.js');
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

// MongoDB session store
const MongoStore = require('connect-mongo')(session);

// Stay here awhile, but not necessary in session,
// since genuid by default generate the uid for session
const uuidv4 = require('uuid/v4'); 

const app = express();

// NOTE: app.get('env') === 'development' (=== 'production' )

// Connecting to MongoDB via mongoose
mongoose.connect(conf.mongodbUrl).then( () => {
		console.log(`Succesfully connected to the MongoDB at URL: ${conf.mongodbUrl}`);
	}, 
		err => { 
			console.error(`Error connecting to the MongoDB at URL: ${conf.mongodbUrl}`);
		}
	 
);

app.use( express.static(path.join(__dirname, 'public')) );

app.use(session({
  // genid: (req) => {
  //   console.log('Inside the session middleware');
  //   console.log(req.sessionID);
  //   return uuidv4(); // use UUIDs for session IDs
  // },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'keyboard cat', //TODO: Set to random string in prod
  // TODO: Set cookie: {} in recomended values when use HTTPS
	resave: false,
  saveUninitialized: true
}))

app.use((req, res) => {
  console.log('Inside the homepage callback function');
  console.log(req.sessionID);
  res.send(`You hit home page!\n`);
})


// This part comes from http://www.passportjs.org/docs/configure/
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(conf.listenPort, () => {
	console.log(`Server listen to :${conf.listenPort}`);
});