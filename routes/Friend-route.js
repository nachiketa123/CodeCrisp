const express = require('express');
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


router.post('/sendFriendRequest',(req,res)=>{
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

module.exports = router