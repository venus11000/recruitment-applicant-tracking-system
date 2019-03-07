const express = require('express');
const router = express.Router();

const User = require('../../models/User');

//	GET All Jobs
router.get('/', (req, res) => {
	User.find().then(users => res.json(users));
});