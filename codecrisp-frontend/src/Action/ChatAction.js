import axios from "axios"
import { SEND_MESSAGE , RECIEVE_MESSAGE,GET_ALL_MESSAGES_OF_FRIEND, RESET_CHAT_MESSAGES, SET_CHAT_MESSAGES_LOADING } from "./Types"

export const sendMessage = (data) => (dispatch) =>{
   console.log('in send message')
   axios.post(`/api/chat/send/${data.user_id}`,{friend_id:data.friend_id,text:data.text})
      .then(res=>{
         if(res.data.success === true){
            dispatch({
               type:SEND_MESSAGE,
               payload:res.data.payload
            })
         }
         else{
            console.log('data sent was not successfull')
         }
        
      })
        
       
}


export const reciveMessage = (data) => (dispatch) =>{
   console.log('in recieve Message')
    dispatch({
       type:RECIEVE_MESSAGE,
       payload:data
    })
   
}

export const loadChatOfUser = (data) => (dispatch) =>{
   dispatch({
      type: SET_CHAT_MESSAGES_LOADING,
      payload: true
   })
   axios.get(`/api/chat/${data.user_id}`,{params:{friend_id:data.friend_id,page:data.page}})
      .then(res=>{
         dispatch({
            type: GET_ALL_MESSAGES_OF_FRIEND,
            payload: res.data
         })
         dispatch({
            type: SET_CHAT_MESSAGES_LOADING,
            payload: false
         })
      }).catch(err=>{
         console.log(err)
      })
}

export const resetChatMessages = () => (dispatch) =>{
   dispatch({
      type: RESET_CHAT_MESSAGES,
      payload: {}
   })
}