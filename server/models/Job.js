const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
	jobId: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true
	},
	company: String,
	numberOfOpenings: Number,
	location: String,
	contactPerson: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	jobType: String,
	ctc: String,
	industry: String,
	workExperience: String,
	jobStatus: String,
	description: String,
	createdDate: {
		type: Date,
		default: Date.now
	},
	targetDate: Date,
	workExperience: String,
	candidates: [{
		candidate: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Candidate',
		},
		status: {
			type: String,
			default: 'Applied'
		},
		appliedDate: {
			type: Date,
			default: Date.now
		}
	}]
});

module.exports = mongoose.model('Job', jobSchema);