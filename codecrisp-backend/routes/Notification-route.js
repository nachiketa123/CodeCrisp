const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserNotification = require('../model/UserNotification')
const isEmpty = require('../utility/is-empty')
const {compareDateDesc} = require('../utility/custom-sort-backend');
const { default: mongoose } = require('mongoose');

//Utility function for creating notification with empty array [] on user signup to avoid runtime errors
const createZeroNotificationEntryOnUserSignup = (user)=>{
    return new Promise((resolve,reject)=>{
        const newNotificationItemWithZeroNotification = new UserNotification({
            user,
            notification:[]
        })
        newNotificationItemWithZeroNotification.save().then(()=>{
            resolve();
        }).catch(err=>{
            reject(err);
        })  
        
    })
}
//Utility function to set the seen flag of notification as true as user loaded notificatoins till here
const markNotificationAsSeen = (notifObject, startIndex, limit) =>{
    return new Promise((resolve,reject)=>{
        const newNotfication = notifObject.notification.sort(compareDateDesc).map((e,index)=>{
            if(index >= startIndex && index <= (startIndex + limit -1)){
                return {...e, seen: true}
            }
            return e
        })
        notifObject.notification = newNotfication
        notifObject.save()
                    .then(data=>{
                        resolve(data)
                    }).catch(err=>{
                        reject(err)
                    })
    })
    
}


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

            return res.status(200).json({notification: notifs.notification})
        }).catch(err=>{
            error.dberror = 'DB Error '+err
            return res.status(403).json(error)
        })
    }
    else{
        page = parseInt(page)
        let limit = 4;
        const error = {}

        UserNotification.findOne({ user: user_id}).then(async notifs=>{
            if(!notifs || isEmpty(notifs.notification)){
                notifs.notification = []
                return res.status(200).json({notification:notifs.notification})
            }

            // let say we have limit of 2 notifications per page then for page 0 we will have from 0 to 1. Note endIndex is exclusive
            const startIndex = page*limit;

            const newNotifsArr = [...notifs.notification]

            const notifArray = newNotifsArr.sort(compareDateDesc).splice(startIndex, limit)

            const newNotification = notifArray.map((notif)=>{
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

            await markNotificationAsSeen(notifs,startIndex,limit)

            
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
            return res.status(200).json(0)
        }

        const notifications = notifs.notification.filter(e=>e.seen === false)
        const count_unseen_notif = notifications.length
        return res.status(200).json(count_unseen_notif)

    }).catch(err=>{
        error.dberror = 'DB Error '+err
        return res.status(403).json(error)
    })
}) 

/*
    @route:     /api/notification/check-if-notification-empty
    @desc:      To check if there are notification for the current user or not
    @access:    Private
*/

router.get('/check-if-notification-empty/:user_id',(req,res)=>{
    const userId = req.params.user_id
    UserNotification.findOne({user: mongoose.Types.ObjectId(userId)})
    .then(data=>{
        if(isEmpty(data) || isEmpty(data.notification)){
            return res.status(404).json({totalNotification: 0})
        }
        return res.status(200).json({totalNotification: data.notification.length});
    }).catch(err=>{
        res.status(403).json(err);
    })
})

module.exports = {router,createZeroNotificationEntryOnUserSignup};