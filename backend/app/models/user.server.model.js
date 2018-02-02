// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define a new 'ArticleSchema'
var UsersSchema = new Schema({
	firstName: {
		type: String,
	},
	lastName:{
		type: String,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	phone: {
		type: String,
	},
	city: {
		type: String,
	},
	created: {
    type: Date,
    default: Date.now
  },
});


// Create the 'Article' model out of the 'ArticleSchema'
mongoose.model('User', UsersSchema);
