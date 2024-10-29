const mongoose = require('mongoose')
const Schema  = mongoose.Schema;


const MessageSchema = new Schema({
     user:{
       
       type:Schema.Types.ObjectId,
       ref:"user_datas"
       
     },
     friend_list:[
         
         {
             user:{         
             type:Schema.Types.ObjectId,
             ref:"user_datas"
             },
             avatar:{
               type:String
             }
             ,
             messages:[
                 
                 {
                      
                      text:{
                        type:String,
                        required:true
                      },
                      dt_time:{
                         type:Date,
                         default:Date.now
                      },
                      recived:{
                        type:Boolean,
                        default:true
                      }
                      
                   
                 }
               
             ]
             
             
         }
        
     ]
})


module.exports = mongoose.model("user_messages" , MessageSchema)


