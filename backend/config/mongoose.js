// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config'),
	mongoose = require('mongoose');

	const options = {
	  useMongoClient: true,
	  autoIndex: false, // Don't build indexes
	  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	  reconnectInterval: 500, // Reconnect every 500ms
	  poolSize: 10, // Maintain up to 10 socket connections
	  bufferMaxEntries: 0
	};

// Define the Mongoose configuration method
module.exports = function() {

	var db = mongoose.connect(config.db, options);
	require('../app/models/user.server.model');

	return db;

};
