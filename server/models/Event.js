const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	title: String,
	location: String,
	description: String,
	assignedPerson: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	from: Date,
	to: Date
});

module.exports = mongoose.model('Events', eventSchema);