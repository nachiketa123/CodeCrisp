import axios from "axios"
import { SEND_MESSAGE , RECIEVE_MESSAGE,GET_ALL_MESSAGES_OF_FRIEND } from "./Types"

export const sendMessage = (data) => (dispatch) =>{
   
   axios.post(`/api/chat/send/${data.user_id}`,{friend_id:data.friend_id,text:data.text})
      .then(res=>{
         if(res.data.success === true){
            dispatch({
               type:SEND_MESSAGE,
               payload:data
            })
         }
         else{
            console.log('data sent was not successfull')
         }
        
      })
        
       
}


export const reciveMessage = (data) => (dispatch) =>{
       
    dispatch({
       type:RECIEVE_MESSAGE,
       payload:data
    })
   
}

export const loadChatOfUser = (data) => (dispatch) =>{
   axios.get(`/api/chat/${data.user_id}`,{params:{friend_id:data.friend_id}})
      .then(res=>{
         console.log(res.data)
         dispatch({
            type: GET_ALL_MESSAGES_OF_FRIEND,
            payload: res.data
         })
      })
}