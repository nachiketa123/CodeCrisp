const express = require("express")
const Job = require("../model/JobsDetail")
const router = express.Router()
const passport = require('passport');
const User = require("../model/User")

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // const { jobname, jobdesc, company, joblocation, startdate, enddate } = req.body;
    // const newJob = new Job({ jobname, jobdesc, company, joblocation, startdate, enddate });
    const error = {}
    Job.find().then(
        jobsData => {
            return res.status(200).json(jobsData);
        }
    ).catch(
        err => {
            error.dberror = 'DB error'
            return res.status(403).json(dberror)
        }
    )

})

router.get('/:id', (req, res) => {
    const _id = req.params.id;
    const error = {}
    Job.findById(_id).then(
        user => {
            if(user)
                return res.status(200).json(user);
            else{
                error.pageNotFound = 'Job Id not available'
                return res.status(404).json(error)
            }
                
        }
    ).catch(
        err => {
            error.pageNotFound = 'Job Id not available'
            res.status(404).json(error);
        }
    )
})

module.exports = router;