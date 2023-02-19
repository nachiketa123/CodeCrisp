const express = require('express');
const router = express.Router();
const UserNotification = require('../model/UserNotification')
const isEmpty = require('../utility/is-empty')

/*
    @route:     /api/notification/all-notification/:user_id
    @desc:      To fetch all the notifications of current user from the system
    @access:    Private
*/
router.get('/all-notification/:user_id',(req,res)=>{
    const { user_id } = req.params;
    let { page } = req.query;

    // That means we are not opening the notificaiton
    if(isEmpty(page)){
        UserNotification.findOne({ user: user_id})
        .then(notifs=>{
            if(!notifs || isEmpty(notifs.notification)){
                notifs.notification = []
            }

            return res.status(200).json(notifs)
        }).catch(err=>{
            error.dberror = 'DB Error '+err
            return res.status(403).json(error)
        })
    }
    else{
        const limit = 3;

        const error = {}

        UserNotification.findOne({ user: user_id}).then(notifs=>{
            if(!notifs || isEmpty(notifs.notification)){
                notifs.notification = []
                return res.status(200).json(notifs)
            }

            // let say we have limit of 2 notifications per page then for page 0 we will have from 0 to 1. Note endIndex is exclusive
            const startIndex = page*limit;
            const endIndex = (page+1)*limit;

            notifs.notification = notifs.notification.splice(startIndex, endIndex)
            notifs.notification.map(notif=>{
                notif = {...notif,page: page}
            })

            return res.status(200).json(notifs)
        }).catch(err=>{
            error.dberror = 'DB Error '+err
            return res.status(403).json(error)
        })
    }
})


module.exports = router;