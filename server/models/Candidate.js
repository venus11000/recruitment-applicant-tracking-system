const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
	institute: String,
	specialisation: String,
	passoutYear: String,
	score: String
});

const experienceSchema = new mongoose.Schema({
	jobTitle: String,
	organisation: String,
	description: String,
	from: String,
	to: String
});

const candidateSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	gender: String,
	address: String,
	skills: [],
	education: [educationSchema],
	experience: [experienceSchema],
	resume: String,
});

module.exports = mongoose.model('Candidate', candidateSchema);