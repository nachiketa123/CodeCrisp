const express = require('express');
const passport = require('passport');
const FriendCollection = require('../model/Friend')
const router = express.Router();
const isEmpty = require('../utility/is-empty')
const User = require('../model/User')
const UserNotification = require('../model/UserNotification')
const mongoose = require('mongoose');
const { NOTIFICATION } = require('../socketEvents/notification-event-sckt');

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
    //TODO: Create a notification model+ add a friend request notification to recipient
    // res.json({sender_user_id,recipient_user_id})

    //For now adding friends directly without acceptance
    //Add recipient in sender
    //Find the sender user(one who got the request)
    create_or_update_friend_list(sender_user_id, recipient_user_id)
        .then(data => {
            create_or_update_friend_list(recipient_user_id, sender_user_id)
                .then(data => {
                    //set the notification as seen by the user
                    UserNotification.findOne({user: mongoose.Types.ObjectId(sender_user_id)})
                        .then(data=>{
                            if(!data || isEmpty(data.notification)){
                                return res.status(200).json("No notification for friend request")
                            }
                                
                            let newObj, indexToReplace=-1, indexToDelete=-1
                            data.notification.map((notif,index)=>{
                                //make this new notification seen as true as user has accepted the request
                                if(notif.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST 
                                    && notif.source.user.toString() === recipient_user_id
                                    && notif.seen === false){
                                        newObj = {
                                            type:notif.type
                                            ,data:notif.date
                                            ,source:notif.source
                                            ,_id:notif._id,
                                            seen: true}

                                        indexToReplace = index
                                    }

                                if(notif.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST 
                                    && notif.source.user.toString() === recipient_user_id
                                    && notif.seen === true){
                                        indexToDelete = index
                                    }
                            })
                            
                            data.notification.splice(indexToReplace,1,newObj)

                            if(indexToDelete !== -1)
                                data.notification.splice(indexToDelete,1)
                            
                            data.save()
                                .then(newdata=>{

                                    return res.status(200).json({success: true, payload: newdata})
                                }).catch(err=>{
                                    error.dberror = 'DB error'
                                    return res.status(500).json(error)
                                })
                            
                        }).catch(err=>{
                            error.dberror = 'DB error'
                            return res.status(500).json(error)
                        })
                    

                })
                .catch(err => {
                    error.dberror = 'DB error'
                    return res.status(403).json(error)
                })
        }).catch(err => {
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
        return res.status(200).json('Unfriend successful, both users are no longer friends');
    } catch (err) {
        error.dberror = 'DB error ' + err
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
    FriendCollection.findOne({ user: mongoose.Types.ObjectId(user_id) })
        .then(data => {

            //First checking if user is already a friend 
            let isFriend = data.friend_list.filter(friend => friend.user.toString() === friend_id.toString()).length != 0 ? 1:-1

            if(isFriend === 1) return res.status(200).json(isFriend)

            //checking if a friend request is been sent or not
            if(isFriend === -1){
                UserNotification.findOne({user: mongoose.Types.ObjectId(friend_id)})
                    .then(data=>{
   
                        if(!data || isEmpty(data.notification)){
                            //no friend request is present 
                            isFriend = -1
                            return res.status(200).json(isFriend)
                        }

                        //check in the notification array if notification of type 'friend-request' is present with user 
                       let isFriend = data.notification
                            .filter(notif => {

                                return notif.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST 
                                && notif.source.user.toString() === user_id
                                && notif.seen === false}).length === 0? -1 : 0
                        if(isFriend === 0)
                            return res.status(200).json(isFriend)
                        
                        //Check our own notification if their is request
                        UserNotification.findOne({user: mongoose.Types.ObjectId(user_id)})
                            .then(data=>{
                                    if(!data || isEmpty(data.notification)){
                                        //no friend request is present 
                                        isFriend = -1
                                        return res.status(200).json(isFriend)
                                    }

                                    //check in the notification array if notification of type 'friend-request' is present with user 
                                    let isFriend = data.notification
                                    .filter(notif => {

                                        return notif.type === NOTIFICATION.EVENT_ON.FRIEND_REQUEST 
                                        && notif.source.user.toString() === friend_id
                                        && notif.seen === false}).length === 0? -1 : 2
                                    
                                        return res.status(200).json(isFriend)
                                })
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
                for(let i=0; i<friend_list.length; ++i){
                    try{
                        const userDetails = await getFriendDetails(friend_list[i])
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
module.exports = router