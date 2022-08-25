const express = require("express")
const Job = require("../model/JobsDetail")
const router = express.Router()
const passport = require('passport');


router.get('/',passport.authenticate('jwt',{session:false}), (req, res) => {
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

module.exports = router;