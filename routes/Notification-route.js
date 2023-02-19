const express = require('express');
const passport = require('passport');
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
    let  page  = req.query.page;

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
        page = parseInt(page)
        const limit = 4;
        const error = {}

        UserNotification.findOne({ user: user_id}).then(notifs=>{
            if(!notifs || isEmpty(notifs.notification)){
                notifs.notification = []
                return res.status(200).json(notifs)
            }

            // let say we have limit of 2 notifications per page then for page 0 we will have from 0 to 1. Note endIndex is exclusive
            const startIndex = page*limit;

            notifs.notification = notifs.notification.splice(startIndex, limit)
            const newNotification = notifs.notification.map((notif)=>{
                return {
                    action_item_img: notif.action_item_img,
                    source: notif.source,
                    seen: notif.seen,
                    _id: notif._id,
                    date: notif.date,
                    type: notif.type,
                    page: parseInt(page)
                }
                
            })

            return res.status(200).json({notification: newNotification})
        }).catch(err=>{
            error.dberror = 'DB Error '+err
            return res.status(403).json(error)
        })
    }
})

/*
    @route:     /api/notification/new-notif/:user_id
    @desc:      To fetch the count of number of new/unseen notification form db
    @access:    Private
*/

router.get('/new-notif/:user_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const user_id = req.params.user_id;
    const error = {}
    UserNotification.findOne({user: user_id})
    .then(notifs=>{
        
        if(!notifs || isEmpty(notifs.notification)){
            notifs.notification = []
            return res.status(200).json(notifs)
        }

        const notifications = notifs.notification.filter(e=>e.seen === false)
        const count_unseen_notif = notifications.length
        return res.status(200).json(count_unseen_notif)

    }).catch(err=>{
        error.dberror = 'DB Error '+err
        return res.status(403).json(error)
    })
}) 

module.exports = router;