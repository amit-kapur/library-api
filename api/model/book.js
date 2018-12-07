'use strict';
var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String
	},
	category: {
		type: [{
			type: String,
			enum: ['drama', 'comedy', 'sport']
		}],
		default: ['drama']
	},
	description: {
		type: String
	},
});

module.exports = mongoose.model('Books', bookSchema);