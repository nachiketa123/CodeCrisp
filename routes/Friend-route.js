const express = require('express');
const passport = require('passport');
const FriendCollection = require('../model/Friend')
const router = express.Router();
const isEmpty = require('../utility/is-empty')
const User = require('../model/User')

const create_or_update_friend_list=(sender,reciever)=>{
    return new Promise((resolve,reject)=>{
        FriendCollection.findOne({user: sender})
        .then(data=>{
            if(data){
                //user found update the user by adding new sender
                const newFriend = {
                    user: reciever
                }
                try{
                    data.friend_list.push(newFriend);
                }catch(err){
                    res.status(400).json(err)
                }
                data.save().then(data=>{
                    //once success send response friend added successfully
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })

            }
            else{
                //create the user and then insert the data accordingly
                const newFriend = new FriendCollection({
                    user:sender,
                    friend_list:[{
                        user:reciever
                    }]
                }) 
                newFriend.save().then(data=>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
            }

        })
    })
    
}

const deleteAndUpdateFriendList = (sender,reciever)=>{
    return new Promise((resolve,reject)=>{
        FriendCollection.findOne({ user: sender})
        .then(data=>{
            const friend_list = data.friend_list.filter(friend=>friend.user.toString() !== reciever.toString());
            data.friend_list = friend_list;
            // console.log(typeof data, data.friend_list)
            data.save().then(updatedData=>{
                resolve(updatedData)
            }).catch(err=>{
                reject(err)
            })
        }).catch(err=>{
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
    @route:     /api/friend/sendFriendRequest
    @desc:      To send Friend Request to a particular user
    @access:    Private
*/
router.post('/sendFriendRequest',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {sender_user_id, recipient_user_id} = req.body;
    const error = {}
    //TODO: Create a notification model+ add a friend request notification to recipient
    // res.json({sender_user_id,recipient_user_id})

    //For now adding friends directly without acceptance
    //Add recipient in sender
    //Find the sender user
    create_or_update_friend_list(sender_user_id,recipient_user_id)
    .then(data=>{
        create_or_update_friend_list(recipient_user_id,sender_user_id)
            .then(data=>{
                return res.status(200).json('Friend added')
            })
            .catch(err=>{
                error.dberror = 'DB error'
                return res.status(403).json(dberror)
            })
    }).catch(err=>{
        error.dberror = 'DB error'
        return res.status(403).json(dberror)
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
    try{
        let updatedData = await deleteAndUpdateFriendList(sender_user_id,recipient_user_id);
        updatedData = await deleteAndUpdateFriendList(recipient_user_id,sender_user_id);
        return res.status(200).json('Unfriend successful, both users are no longer friends');
    }catch(err){
        error.dberror = 'DB error '+err
        return res.status(403).json(error)
    }
    

})

/*
    @route:     /api/friend/check-if-friend-with-user
    @desc:      To check if current user is friend with another user
    @access:    Private
*/
router.get('/check-if-friend-with-user',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const { user_id,friend_id } = req.query;
    const error = {}
    FriendCollection.findOne({ user: user_id})
        .then(data=>{
            const isFriend = data.friend_list.filter(friend=> friend.user.toString() === friend_id.toString()).length != 0
            return res.status(200).json(isFriend)
        }).catch(err=>{
            error.dberror = 'DB Error '+err
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