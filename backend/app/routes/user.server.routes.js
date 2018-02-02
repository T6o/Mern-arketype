// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var user = require('../../app/controllers/user.server.controller');

// Define the routes module' method
module.exports = function(app) {

	// Set up the 'articles' base routes
	app.route('/api/user')
	   .get(user.list)

	// Set up the 'articles' parameterized routes
	app.route('/api/user')
	   .post(user.create)

};
