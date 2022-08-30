const express = require('express');
const router = express.Router();
const passport = require('passport')
const UserProfile = require('../model/UserProfile')

/*
    @route:     /api/user_profile/get_profile/:user_id
    @desc:      To get the profile of a specific user
    @access:    Private
*/
router.get('/get-profile/:user_id',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const user_id = req.params.user_id;
    const error = {}
    UserProfile.findOne({user:user_id})
        .then(profile=>{
            if(!profile){
                error.profileNotFound = 'User does not have a profile'
                return res.status(404).json(error)
            }
                
            return res.status(200).json(profile)
        }).catch(err=>{
            return res.json(err);
        })
})

/*
    @route:     /api/user_profile/set_profile
    @desc:      To set the profile of a specific user
    @access:    Private
*/

router.post('/set-profile',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const { user, company, website, location, current_job_title, skills } = req.body;

    const newUserProfile = new UserProfile({
        user, 
        company, 
        website, 
        location, 
        current_job_title, 
        skills
    })
    newUserProfile.save().then(profile=>{
        return res.status(200).json(profile)
    }).catch(err=>{
        return res.status(400).json(err)
    })
})

module.exports = router;