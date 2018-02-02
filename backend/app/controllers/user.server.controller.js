// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	User = mongoose.model('User');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new articles
exports.create = function(req, res) {
	console.log(req.body);

	// Create a new article object
	var user = new User(req.body);

	// Set the article's 'creator' property
	user.creator = req.user;

	// Try saving the article
	user.save(function(err) {
		if (err) {
			res.json({
				success: false,
				message: err,
			})
		} else {
			res.json({
        success: true,
        message: 'ok',
				user: user
      });
		}
	});
};

// Create a new controller method that retrieves a list of articles
exports.list = function(req, res) {
	console.log(req.body);
	// Use the model 'find' method to get a list of articles
	User.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, issues) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article
			res.json(issues);
		}
	});
};

// Create a new controller middleware that is used to authorize an article operation
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the article send the appropriate error message
	if (req.article.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};
