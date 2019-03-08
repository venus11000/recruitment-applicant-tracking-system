const express = require('express');
const router = express.Router();

const Candidate = require('../../models/Candidate');

//	GET All Jobs
router.get('/', (req, res) => {
	allCandidates()
		.then(candidates => res.json(candidates))
		.catch(err => res.json(handleError(err, `Unable to get the Candidates`)));
});
//	Get single Candidate with id
router.get('/:id', (req, res) => {
	getCandidatesById(req.params.id)
		.then(candidate => res.json(candidate))
		.catch(err => res.json(handleError(err, `Unable to get Candidate associated with id: ${req.params.id}`)));
});

//	Create a Candidate
router.post('/', (req, res) => {
	addCandidate(req.body)
		.then(() => { res.json({ success: true, message: 'Candidate created successfully' }); })
		.catch((err) => { res.json(handleError(err, `Unable to create the candidate`)); });
});

//	Update a Candidate
router.put('/:id', (req, res) => {
	updateCandidate(req.params.id, req.body)
		.then(() => { res.json({ success: true, message: 'Candidate updated successfully' }); })
		.catch((err) => { res.json(handleError(err, `Unable to edit the candidate with id: ${req.params.id}`)); });
});

//	Delete a candidate
router.delete('/:id', (req, res) => {
	deleteCandidateById(req.params.id)
		.then((candidate) => candidate !== null ? res.json({ success: true, message: 'Candidate deleted successfully'}) : res.json(handleError(err, `Unable to delete a Candidate associated with id: ${req.params.id}`)))
		.catch(err => res.json(handleError(err, `Unable to delete Candidate associated with id: ${req.params.id}`)));
});
const allCandidates = () => Candidate.find({});

const getCandidatesById = (id) => Candidate.findById(id);

const addCandidate = (candidate) => Candidate.create(candidate);

const updateCandidate = (id, newCandidate) => Candidate.findByIdAndUpdate(id, newCandidate);

const deleteCandidateById = (id) => Candidate.findByIdAndRemove(id);

const handleError = (err, errorMessage) => {
	let error = {
		success: false,
		message: errorMessage || err
	};
	return error;
}

module.exports = router;