const express = require('express');
const router = express.Router();

const Candidate = require('../../models/Candidate');

//	GET All Jobs
router.get('/', (req, res) => {
	Candidate.find().then(candidates => res.json(candidates));
});