const express = require("express")
const Job = require("../model/JobsDetail")
const router = express.Router()
const passport = require('passport');
const User = require("../model/User")

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { jobname, jobdesc, company, joblocation, startdate, enddate } = req.body;
    // const newJob = new Job({ jobname, jobdesc, company, joblocation, startdate, enddate });

    Job.find().then(
        jobsData => {
            return res.status(200).json(jobsData);
        }
    ).catch(
        err => {
            return res.status(404).json(err);
        }
    )

})

router.get('/:id', (req, res) => {
    const _id = req.params.id;
    Job.findById(_id).then(
        user => {
            return res.status(200).json(user);
        }
    ).catch(
        err => {
            res.status(400).json(err);
        }
    )
})

module.exports = router;