const express = require('express');
const router = express.Router();
const UserNotification = require('../model/UserNotification')

/*
    @route:     /api/notification/all-notification/:user_id
    @desc:      To fetch all the notifications of current user from the system
    @access:    Private
*/
router.get('/all-notification/:user_id',(req,res)=>{
    const { user_id } = req.params;
    const error = {}

    UserNotification.findOne({ user: user_id}).then(notifs=>{
        if(!notifs){
            error.noNotificationFound = 'No notification found for the user'
            return res.status(403).json(error)
        }
        return res.status(200).json(notifs)
    }).catch(err=>{
        error.dberror = 'DB Error '+err
        return res.status(403).json(error)
    })
})


module.exports = router;