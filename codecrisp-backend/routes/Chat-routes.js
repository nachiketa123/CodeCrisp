const express = require('express');
const passport = require('passport');
const MessageSchema = require('../model/Messages');
const router = express.Router();
const mongoose = require('mongoose');
const {notificationEventEmitter, NOTIFICATION} = require('../socketEvents/notification-event-sckt')
const isEmpty = require('../utility/is-empty');
const { compareDateAsc, compareDateDesc } = require('../utility/custom-sort-backend');


const createNewDocumenForMessageSchema = (user_id,friend_id,messageArr) =>{
   return new Promise((resolve,reject)=>{
   try{
         const newObject = new MessageSchema({
            user : user_id,
            friend_list : [{
               user : friend_id,
               messages : messageArr
            }]
         })
         newObject.save()
            .then(data=>{
               resolve(data)
            }).catch(err=>{
               reject(err)
            })
        
      }catch(err){
         reject(err)
      }
      
   })
}
//To check if a user exist in the schema or not
const checkIfUserInSchema = (user_id)=>{

   return new Promise((resolve,reject)=>[
      MessageSchema.findOne({user:mongoose.Types.ObjectId(user_id)})
         .then(data=>{
            if(data){
               resolve({found: true,data})
            }
            else{
               resolve({found:false,data:{}})
            }
         }).catch(err=>{
            reject(err)
         })
   ])
   
}

//This function adds Message data into userObj for friend_id as id 
const addDataToUser = (userObj,id,data,at=-1) =>{
   return new Promise((resolve,reject)=>{

      if(at === -1){
         const index = userObj.friend_list.findIndex(e=>e.user.toString() === id)
         if(index === -1){
            reject('Error in method addDataToUser, id not found in userObj, failed to add the Data to User')
            return 
         }
         
         userObj.friend_list[index].messages.push(data)
         userObj.save()
            .then((data)=>{
               resolve(data)
            }).catch(err=>{
               reject(err)
            })
      }else{
         userObj.friend_list[at].messages.push(data)
         userObj.save()
            .then((data)=>{
               resolve(data)
            }).catch(err=>{
               reject(err)
            })
      }
   })
}

//This function check if in UserSchema, friend_id is there or not, if yes then returns the index of the friend
const checkIfFriendExistInUser = (userObj, friend_id) =>{
   return new Promise((resolve,reject)=>{
      const index = userObj.friend_list.findIndex(e=>e.user.toString() === friend_id)
      if(index === -1){
         resolve({found:false, index:-1})
      }else{
         resolve({found:true, index:index})
      }
   })
}

/*    Deprecated API
    @route:     /api/chat/:user_id
    @desc:      To get all the chat of the user with user's friends
    @access:    Private
*/
router.get('/my/:user_id',passport.authenticate('jwt', { session: false }),(req,res) =>{
    
     const {user_id} = req.params;  //  url
     const {friend_id} = req.query;  //  we will send it 
     
     if(user_id){
         MessageSchema.findOne({user : mongoose.Types.ObjectId(user_id)}).then(
            
       data =>{
        if(!data) return res.status(200).json([])

        const friend_data =  data.friend_list.filter(e => ( e.user.toString() === friend_id))

        if(isEmpty(friend_data) || isEmpty(friend_data[0].messages)) return res.status(200).json([])

      //   const msgArr = [...message_array[0].messages.map(e=> e.text)]
           return res.status(200).json(friend_data[0].messages);
       }     
            
        
     ).catch(
     err =>{
        return res.status(400).json(err)
     }
     )
    }
})

/*
    @route:     /api/chat/send/:user_id
    @desc:      To add message 
    @access:    Private
*/
router.post('/send/:user_id',passport.authenticate('jwt', { session: false }),  async (req,res) =>{
     
   const {user_id} = req.params;  //  url
   let {friend_id  ,  text } = req.body;  //  we will send it 
   const error = {}

   try{
      const userObj = await checkIfUserInSchema(user_id)
      const friendObj = await checkIfUserInSchema(friend_id)
      if(!userObj.found){
         userObj.data = await createNewDocumenForMessageSchema(user_id,friend_id,[{text,recived:false}])
      }
      if(!friendObj.found){
         friendObj.data = await createNewDocumenForMessageSchema(friend_id,user_id,[{text}])
      }

      const isFriend1 = await checkIfFriendExistInUser(userObj.data,friend_id)
      if(!isFriend1.found){
         const obj = {
            user: friend_id,
            messages:[]
         }
         userObj.data.friend_list.push(obj)
         isFriend1.found = true
         isFriend1.index = userObj.data.friend_list.length-1
      }

      const isFriend2 = await checkIfFriendExistInUser(friendObj.data,user_id)
      
      if(!isFriend2.found){
         const obj = {
            user: user_id,
            messages:[]
         }
         friendObj.data.friend_list.push(obj)
         isFriend2.found = true
         isFriend2.index = friendObj.data.friend_list.length-1
      }

         const msgData1 = {
            text,
            recived: false
         }
         if(userObj.found)
            await addDataToUser(userObj.data,friend_id,msgData1,isFriend1.index)


         const msgData2 = {
            text,
         }
         if(friendObj.found)
            await addDataToUser(friendObj.data,user_id,msgData2,isFriend2.index)
         
         const emit_data = userObj.data.friend_list[isFriend1.index].messages.at(-1)
       
       const res_data = {
          text:emit_data.text,
          recived:true,
          _id:emit_data._id,
          dt_time:emit_data.dt_time
       }

         notificationEventEmitter(NOTIFICATION.EVENT_EMIT.GET_NEW_MESSAGE_REQUEST_NOTIFICATION,friend_id,res_data)
         
         // console.log(emit_data)
         return res.status(200).json({success: true,payload:emit_data})
   }catch(err){
      error.dbError = 'DB Error '+err
      return res.status(500).json(error)
   }
   // return res.status(200).json({success: true,payload:userObj.data})
})


/*
    @route:     /api/chat/:user_id
    @desc:      To get all the chat of the user with user's friends
    @access:    Private
*/
router.get('/:user_id'
      ,passport.authenticate('jwt', { session: false })
      ,(req,res) =>{
         const {user_id} = req.params;
         let {friend_id,page} = req.query;
         const limit = 3;

         //convert page into int
         page = parseInt(page)

         if(!isEmpty(user_id) && !isEmpty(friend_id)){
            MessageSchema.aggregate(
               [
                  {
                    $match: {
                      user:mongoose.Types.ObjectId(user_id)
                    }
                  },
                  {
                    $unwind: "$friend_list"
                  },
                  {
                    $project: {
                      "_id":0,
                      "user_id":"$_id",
                      "friend_id":"$friend_list.user",
                      "messages":"$friend_list.messages"
                    }
                  },
                  {
                    $match: {
                      "friend_id": mongoose.Types.ObjectId(friend_id)
                    }
                  },
                  {
                    $addFields: {
                      messages: {
                        $sortArray: {
                          input: "$messages",
                          sortBy: { dt_time: -1 }
                        }
                      }
                    }
                  },
                  {
                    $addFields: {
                      messages: {
                        $slice: ["$messages",page*limit,3]
                      }
                    }
                  },
                  {
                     $project:{
                        messages:1,
                        page:1,
                     }
                  }
                ]
            ).then(data=>{
               
               if(isEmpty(data) || isEmpty(data[0].messages))
                  return res.status(200).json({page,messages:[]})
               
               //else
               return res.status(200).json({
                                             messages:data[0].messages.sort(compareDateAsc),
                                             page
                                       })
            }).catch(err=>{
               console.log('error in database',err)
               res.status(403).json(err)
            })
         }else{
            res.status(403).json("Invalid user_id, friend_id")
         }
      })

module.exports = router