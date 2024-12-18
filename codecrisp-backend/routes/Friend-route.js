const express = require('express');
const passport = require('passport');
const FriendCollection = require('../model/Friend')
const router = express.Router();
const isEmpty = require('../utility/is-empty')
const User = require('../model/User')
const UserNotification = require('../model/UserNotification')
const mongoose = require('mongoose');
const { NOTIFICATION, notificationEventEmitter } = require('../socketEvents/notification-event-sckt');
const MessageSchema = require('../model/Messages');

const createEntryWithZeroFriendOnUserSignup = (user) =>{
    return new Promise((resolve,reject)=>{
        const newEntry = new FriendCollection({
            user,
            friend_list: []
        })
        newEntry.save().then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

const getLastMessageWithFriend = (messageSchema,friendId) => {
    return new Promise(async (resolve,reject)=>{
        try{
            //extracting document
            if(isEmpty(messageSchema)){
                resolve({error:"No recent messages", dt_time:''});
                return;
            }
            //fetch message array for specific friend
            const friend = messageSchema.friend_list.filter(friend=>friend.user.toString() === friendId.toString())
            //return last message
            if(isEmpty(friend))
                resolve({error: '', dt_time:''})
            else{
                resolve(friend[0].messages.at(-1))
            }
        }catch(err){
            reject(err)
        }
    })
}

const deleteFriendRequestNotification = (sender,reciver)=>{
    return new Promise((resolve,reject)=>{
        UserNotification.findOne({user: mongoose.Types.ObjectId(reciver)})
            .then(notifObj=>{
                if(!notifObj || isEmpty(notifObj.notification)){
                    resolve({success: false, payload:{}})
                }
                
                notifObj.notification = notifObj.notification.filter(e=>{
                    return !(e.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST
                    && e.source.user.toString() === sender)
                })
                
                notifObj.save()
                        .then(notifObj=>{
                            resolve({success: true,payload:notifObj})
                        }).catch(err=>{
                            reject(err)
                        })
            }).catch(err=>{
                reject(err)
            })
    })
}
const create_or_update_friend_list = (sender, reciever) => {
    return new Promise((resolve, reject) => {
        FriendCollection.findOne({ user: sender })
            .then(data => {
                if (data) {
                    //user found update the user by adding new sender
                    const newFriend = {
                        user: reciever
                    }
                    try {
                        data.friend_list.push(newFriend);
                    } catch (err) {
                        res.status(400).json(err)
                    }
                    data.save().then(data => {
                        //once success send response friend added successfully
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })

                }
                else {
                    //create the user and then insert the data accordingly
                    const newFriend = new FriendCollection({
                        user: sender,
                        friend_list: [{
                            user: reciever
                        }]
                    })
                    newFriend.save().then(data => {
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                }

            })
    })

}

const deleteAndUpdateFriendList = (sender, reciever) => {
    return new Promise((resolve, reject) => {
        FriendCollection.findOne({ user: sender })
            .then(data => {
                const friend_list = data.friend_list.filter(friend => friend.user.toString() !== reciever.toString());
                data.friend_list = friend_list;
                // console.log(typeof data, data.friend_list)
                data.save().then(updatedData => {
                    resolve(updatedData)
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
    })

}

const getFriendDetails = (friend)=>{
    return new Promise((resolve,reject)=>{
        const user_id = friend.user;
        User.findById(user_id)
            .then(user=>{
                if(user){
                    const userDetails = {
                        id: user._id,
                        avatar: user.avatar,
                        name: user.name,
                        email: user.email,
                        isCloseFriend: friend.isCloseFriend,
                        friendship_start_date: friend.friendship_start_date
                    }
                    resolve(userDetails)
                }
                else{
                    reject('User Not Found with id: '+user_id)
                }
            }).catch(err=>{
                reject(err)
            })
    })
}
/*
    @route:     /api/friend/acceptFriendRequest
    @desc:      To accept Friend Request to a particular user also set the notification seen to true
    @access:    Private
*/
router.patch('/acceptFriendRequest',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {sender_user_id, recipient_user_id} = req.body;
    const error = {}

    //Add recipient in sender
    //Find the sender user(one who got the request)
    create_or_update_friend_list(sender_user_id, recipient_user_id)
        .then(data => {
            create_or_update_friend_list(recipient_user_id, sender_user_id)
                .then(async data => {
                    const result_data = await deleteFriendRequestNotification(recipient_user_id,sender_user_id)
                    if(result_data.success){
                        notificationEventEmitter(NOTIFICATION.EVENT_EMIT.GET_FRIEND_REQUEST_ACCEPT_NOTIFICATION,recipient_user_id)
                        return res.status(200).json({success: true})
                    }
                    error.no_notification_found = 'No Notification found'
                    return res.status(500).json(error)
                    
                }).catch(err=>{
                    error.dberror = 'DB error'
                    return res.status(500).json(error)
                })
                    

        })
        .catch(err => {
            error.dberror = 'DB error'
            return res.status(403).json(error)
        })

})

/*
    @route:     /api/friend/sendUnFriendRequest
    @desc:      To send UnFriend Request to a particular user
    @access:    Private
*/
router.post('/sendUnFriendRequest',passport.authenticate('jwt',{session: false}),async (req,res)=>{
    const { sender_user_id, recipient_user_id} = req.body;
    const error = {};
    try {
        let updatedData = await deleteAndUpdateFriendList(sender_user_id, recipient_user_id);
        updatedData = await deleteAndUpdateFriendList(recipient_user_id, sender_user_id);
        notificationEventEmitter(NOTIFICATION.EVENT_EMIT.GET_UNFRIEND_REQUEST_NOTIFICATION,recipient_user_id)
        return res.status(200).json('Unfriend successful, both users are no longer friends');
    } catch (err) {
        error.dberror = 'DB error ' + err
        return res.status(403).json(error)
    }


})

/*
    @route:     /api/friend/cancelFriendRequest
    @desc:      To Cancel a already sent request, basically deletes the friend-request notification and emit socket event to the user
    @access:    Private
*/
router.patch('/cancelFriendRequest',passport.authenticate('jwt',{session: false}),async (req,res)=>{

    const {sender_user_id, recipient_user_id} = req.body;
    const error = {}
    try{
        const result_data = await deleteFriendRequestNotification(sender_user_id,recipient_user_id)
        if(result_data.success){
            notificationEventEmitter(NOTIFICATION.EVENT_EMIT.GET_FRIEND_REQUEST_CANCEL_NOTIFICATION,recipient_user_id)
            return res.status(200).json({success: true})
        }
        else{
            error.no_notification_found = 'No Notification found'
            return res.status(500).json(error)
        }
    }catch(err){
        error.dberror = 'DB Error '+err
        return res.status(403).json(error)
    }
    
    
                
})

/*
    @route:     /api/friend/rejectFriendRequest
    @desc:      To Reject friend request, basically deletes the friend-request notification and emit socket event to the user
    @access:    Private
*/

router.patch('/rejectFriendRequest',passport.authenticate('jwt',{session: false}),async (req,res)=>{

    const {sender_user_id, recipient_user_id} = req.body;
    const error = {}
    
    try{
        const result_data = await deleteFriendRequestNotification(recipient_user_id,sender_user_id)
        if(result_data.success){
            notificationEventEmitter(NOTIFICATION.EVENT_EMIT.GET_FRIEND_REQUEST_REJECT_NOTIFICATION,recipient_user_id,result_data.payload)
            return res.status(200).json({success: true})
        }
        else{
            error.no_notification_found = 'No Notification found'
            return res.status(500).json(error)
        }
    }catch(err){
        error.dbError = "DB Error "+err
        return res.status(403).json(error)
    }
    
                
            

})

/*
    @route:     /api/friend/check-if-friend-with-user
    @desc:      To check if current user is friend with another user (we send code with each having different meaning 
                i.e -1 Meaning show Add Friend, 0 Meaning show Cancel request, 1 Meaning show Unfriend and finally 
                2 Meaning Accept request
    @access:    Private
*/
router.get('/check-if-friend-with-user',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const { user_id,friend_id } = req.query;
    const error = {}
    // console.log('checking if friend')
    FriendCollection.findOne({ user: mongoose.Types.ObjectId(user_id) })
        .then(data => {
            // console.log('checking if user exist in friend collection')
            let isFriend = -1
            //First checking if user is already a friend 
            if(data && !isEmpty(data.friend_list))
                 isFriend = data.friend_list.filter(friend => friend.user.toString() === friend_id.toString()).length !== 0 ? 1:-1

            // console.log('friendlist of user checked result', isFriend)
            if(isFriend === 1) return res.status(200).json(isFriend)

            //checking if a friend request is been sent or not
            if(isFriend === -1){
                UserNotification.findOne({user: mongoose.Types.ObjectId(friend_id)})
                    .then(data=>{
                        // console.log('checking I sent the request')
                        if(data && !isEmpty(data.notification)){
                           
                            //check in the notification array if notification of type 'friend-request' is present with user 
                            isFriend = data.notification
                                .filter(notif => {

                                    return notif.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST 
                                    && notif.source.user.toString() === user_id}).length === 0? -1 : 0
                            // console.log('checked if I sent the request result', isFriend)
                        }
                        if(isFriend === 0)
                            return res.status(200).json(isFriend)
                        
                        //Check our own notification if their is request
                        UserNotification.findOne({user: mongoose.Types.ObjectId(user_id)})
                            .then(data=>{
                                // console.log('checking if I have a friend request')
                                    if(!data || isEmpty(data.notification)){
                                        //no friend request is present 
                                        isFriend = -1
                                        return res.status(200).json(isFriend)
                                    }

                                    //check in the notification array if notification of type 'friend-request' is present with user 
                                    
                                    isFriend = data.notification
                                    .filter(notif => {

                                        return notif.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST 
                                        && notif.source.user.toString() === friend_id}).length === 0? -1 : 2
                                        
                                        // console.log('checked if I have a friend request result', isFriend)
                                        return res.status(200).json(isFriend)
                                }).catch(err => {
                                    error.dberror = 'DB Error ' + err
                                    return res.status(403).json(error)
                                })
                        
                    }).catch(err => {
                        error.dberror = 'DB Error ' + err
                        return res.status(403).json(error)
                    })
            }
        }).catch(err => {
            error.dberror = 'DB Error ' + err
            return res.status(403).json(error)
        })
})

/*
    @route:     /api/friend/get-friend-list/:user_id
    @desc:      To fetch all the friend of current user from the system
    @access:    Private
*/
router.get('/get-friend-list/:user_id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const { user_id } = req.params;
    const error = {}
    FriendCollection.findOne({user: user_id})
        .then(async document=>{
            
            if( isEmpty(document)){
                return res.status(200).json([])
            }
            else{
                const friend_list = document.friend_list;
                const friendDetails = []

                //To get last message of every friend
                //getMessageSchema for current user
                const messageSchema = await MessageSchema.findOne({user: mongoose.Types.ObjectId(user_id)})
                for(let i=0; i<friend_list.length; ++i){
                    try{
                        let userDetails = await getFriendDetails(friend_list[i]) 
                        //adding last message to the friendDetails
                        const lastMessage = await getLastMessageWithFriend(messageSchema,friend_list[i].user);
                        userDetails = {...userDetails, "lastMessage":lastMessage}
                        friendDetails.push(userDetails)
                    }catch(err){
                        error.dberror = 'DB Error '+err
                        return res.status(403).json(error)
                    }
                    
                }
                return res.status(200).json(friendDetails)
            }
        }).catch(err=>{
            error.dberror = 'DB Error '+err
            return res.status(403).json(error)
        })
})

/*
    @route:     /api/friend/get-friend-detail-by-id/:friend_id
    @desc:      To fetch the details of certain friend
    @access:    Private
*/
router.get('/get-friend-detail-by-id/:friend_id',passport.authenticate('jwt',{session: false}),async (req,res)=>{
    const friend_id = req.params.friend_id
    const error = {}
    try{
        const data = await getFriendDetails({user:friend_id})
        return res.status(200).json(data)
    }catch(err){
        error.dbError = 'DB Error '+err
        return res.status(403).json(error)
    }
    
})
module.exports = {router,createEntryWithZeroFriendOnUserSignup}