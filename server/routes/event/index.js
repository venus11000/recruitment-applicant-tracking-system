const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');

//	GET All Jobs
router.get('/', (req, res) => {
	getEvents()
		.then((events) => res.json(events))
		.catch((err) => handleError(err, `Unable to get Events`));
});

//	GET a single Event
router.get('/:id', (req, res) => {
	Event.findById(req.params.id).then((event) => res.json(event))
	.catch((err) => handleError(err));
	getEventById(req.params.id)
		.then((event) => event ? res.json(event) : res.json({ success: false, message: `Unable to get Event associated with id: ${req.params.id}`}))
		.catch((err) => handleError(err, `Unable to get Event associated with id: ${req.params.id}`));
});

//	Create an Event
router.post('/', (req, res) => {
	Event.create(req.body).then(response => {
		console.log(req.body, response);
		return res.json({ success: true, message: 'Event created successfully' });
	}).catch(err => {
		handleError(err, 'Unable to create an Event');
	});
});

//	Edit an Event
router.put('/:id', (req, res) => {
	editEvent(req.params.id, req.body)
		.then((response) => res.json({ success: true, message: 'Event Updated successfully'}))
		.catch((err) => handleError(err, `Unable to Edit and Event associated with id: ${req.params.id}`));
});

//	Delete an Event
router.delete('/:id', (req, res) => {
	deleteEvent(req.params.id)
		.then((response) => res.json({ success: true, message: `Event with an id: ${req.params.id} deleted successfully`}))
		.catch((err) => handleError(err, `Unable to delete an Event associated with id: ${req.params.id}`));
});

const getEvents = () => Event.find();

const getEventById = (id) => Event.findById(id);

const editEvent = (id, event) => Event.findByIdAndUpdate(id, event);

const deleteEvent = (id) => Event.findByIdAndRemove(id);

const handleError = (err, errorMessage) => {
	let error = {
		success: false,
		message: errorMessage || err
	};
	return error;
}

module.exports = router;