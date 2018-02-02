// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
  http = require('http'),
  socketio = require('socket.io'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  MongoStore = require('connect-mongodb-session')(session),
  flash = require('connect-flash'),
  nodemailer = require('nodemailer'),
  corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

// Define the Express configuration method
module.exports = function(db) {
  // Create a new Express application instance
  var app = express();
  var server = http.createServer(app);
//  app.use(cors.preflight)
  app.use(cors.actual)

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  var store = new MongoStore({
    db: db
  });

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: store,
  }));

  // Set the application view engine and 'views' folder
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // Configure the flash messages middleware
  app.use(flash());

  // Load the routing files
  require('../app/routes/user.server.routes.js')(app);

  // Configure static file serving
  app.use(express.static('./public'));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

  return server;

};
