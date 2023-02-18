const express = require('express');
const passport = require('passport');
const MessageSchema = require('../model/Messages');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/:user_id',(req,res) =>{
    
     const {user_id} = req.params;  //  url
     const {friend_id} = req.query;  //  we will send it 
     
     if(user_id){
     MessageSchema.findOne({user : mongoose.Types.ObjectId(user_id)}).then(
            
       data =>{
           
        const message_array =  data.friend_list.filter(e => ( e.user.toString() === friend_id))
           
           return res.status(200).json(message_array);
       }     
            
        
     ).catch(
     err =>{
        return res.status(400).json(err)
     }
     )
    }
})


router.post('/send/:user_id',  (req,res) =>{
     
    const {user_id} = req.params;  //  url
    let {friend_id  ,  text , avatar } = req.body;  //  we will send it 
    
    if(!avatar){
        avatar = ""
    }
   
       MessageSchema.findOne({user : user_id}).then(
            
            data =>{
            
                if(data){
                      
                      let index = -1;         
                      data.friend_list.map( (e , i) => {                
                      if(friend_id === e.user){
                            index = i; 
                      } 
                      })
                            
                       if(index === -1){
                          
                          return res.status(500).json("friend not found")
                       }     
                            
                            const mess = {
                               text : text,
                               recived: false,
                               avatar:avatar
                            }
                            
                            
                        data.friend_list[index].messages.push(mess);
                        data.save().then(
                           d =>{
                              return res.status(200).json(d);
                           }
                        )
                          .catch(
                             err =>{
                               return res.status(400).json(err);
                             }
                          )
                
                }
                else{
                
                  const newObject = new MessageSchema({
                       
                       user :user_id,
                       friend_list:[{
                          
                          user:friend_id,
                          avatar:avatar,
                          messages:[
                            { text:text,
                              recived:false
                            }
                             
                          ]
                       }]
                       
                  
                  })
                  
                  newObject.save().then(             
                     data =>{           
                          return res.status(200).json(data);
                     }  
                  ) 
                }
            
            }
           
       )
 

})


module.exports = router