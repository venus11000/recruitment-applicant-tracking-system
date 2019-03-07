const express = require('express');
const router = express.Router();

const Job = require('../../models/Job');

//	GET All Jobs
router.get('/', (req, res) => {
	Job.find().then(jobs => res.json(jobs));
});

//	GET single Job
router.get('/:id', (req, res) => {
	Job.find({ _id: req.params.id }).then(jobs => res.json(jobs));
});

//	CREATE A Job
router.post("/", function (req, res) {
	const data = req.body;
	createJob(data)
		.then((resp) => { res.json({ success: true, message: 'Job created successfully' }); })
		.catch(err => { res.json(handleError(err, `Unable to create the Job`)); });
});

//DELETE a job
router.delete("/:id", function (req, res) {
	deleteJob(req.params.id)
		.then(() => { res.json({ success: true, message: 'Job deleted successfully' }); })
		.catch(err => { res.json(handleError(err, `Unable to delete the Job ${req.params.id}`)); });
});

//	Edit a Job
router.put('/:id', (req, res) => {
	const job = req.data;
	editJob(req.params.id, job)
		.then(() => { res.json({ success: true, message: 'Job edited successfully' }); })
		.catch(err => { res.json(handleError(err, `Unable to edit the Job ${req.params.id}`)); });
});

//	GET All candidates applied for a Job
router.get('/:id/candidates', (req, res) => {
	console.log("Getting candidates for ", req.params.id);
	getCandidatesByJob(req.params.id)
		.then((candidates) => { res.json(candidates); })
		.catch((err) => { res.json(handleError(err, )); });
});

const createJob = (newJob) => {
	return Job.create(newJob)
};
const editJob = (id, job) => {
	return Job.findByIdAndUpdate(id, job)
};
const deleteJob = (id) => {
	return Job.findByIdAndRemove(id)
};
const getCandidatesByJob = (id) => {
	return Job.find({ _id: id}, 'candidates').populate('candidates.candidate').exec();
}
const handleError = (err, errorMessage) => {
	let error = {
		success: false,
		message: errorMessage || err
	};
	return error;
}

module.exports = router;