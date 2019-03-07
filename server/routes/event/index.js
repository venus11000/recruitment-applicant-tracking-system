const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');

//	GET All Jobs
router.get('/', (req, res) => {
	Event.find().then(events => res.json(events));
});