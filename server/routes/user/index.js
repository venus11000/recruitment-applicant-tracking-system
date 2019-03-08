const express = require('express');
const router = express.Router();

const User = require('../../models/User');

//	GET All Users
router.get('/', (req, res) => {
	getUsers()
		.then((users) => res.json(users))
		.catch((err) => handleError(err));
});

//	Get Single User
router.get('/:id', (req, res) => {
	getUser(req.params.id)
		.then((user) => user ? res.json(user) : res.json({ success: false, message: `There is no User associated with id: ${req.params.id}` }))
		.catch((err) => handleError(err, `There is no User associated with id: ${req.params.id}`));
});

//	Create a user
router.post('/', (req, res) => {
	createUser(req.body)
		.then((response) => res.json({success: true, message: 'User created successfully'}))
		.catch((err) => handleError(err, 'Unable to create a User'));
});

//	Edit an user
router.put('/:id', (req, res) => {
    const data = req.body;
    editUser(req.params.id, data)
        .then(() => { res.json({ success: true, message: 'User successfully updated' }) })
        .catch(err => { res.json(handleError(err)) })
});

//	Delete an user
router.delete('/:id', (req, res) => {
    deleteUser(req.params.id)
        .then(() => { res.json({ success: true, message: 'User deleted successfully' }) })
        .catch(err => { res.json(handleError(err)) })
});


const getUsers = () => User.find();

const getUser = (id) => User.findById(id);

const createUser = (user) => User.create(user);

const editUser = (id, user) => User.findByIdAndUpdate(id, user);

const deleteUser = (id) => User.findByIdAndRemove(id);

const handleError = (err, errorMessage) => {
	let error = {
		success: false,
		message: errorMessage || err
	};
	return error;
}

module.exports = router;