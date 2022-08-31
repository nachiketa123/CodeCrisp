const express = require('express');
const passport = require('passport');
const FriendCollection = require('../model/Friend')
const router = express.Router();

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
            console.log(typeof data, data.friend_list)
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

router.get('/check-if-friend-with-user',(req,res)=>{
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

module.exports = router