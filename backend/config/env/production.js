// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	//db: 'mongodb://localhost/myprog-production',

	db : 'mongodb://localhost/Mern-production',
	sessionSecret: 'productionSessionSecret',
	expiresIn:'15m',
	sendgrid:'',


};
