const express = require('express');
const router = express.Router();

const Job = require('../../models/Job');

router.get('/', (req, res) => {
    Job.find().then(jobs => res.json(jobs));
});

router.post("/", function (req, res) {
    const data = req.body;
    createJob(data)
        .then((resp) => {
            res.json({
                success: true,
                message: 'Job created successfully'
            })
        })
        .catch(err => {
            console.log(err);
            res.json(handleError(err));
        });
});

const createJob = (newJob) => {
    return Job.create(newJob)
};

module.exports = router;