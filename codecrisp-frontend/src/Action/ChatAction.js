import { SEND_MESSAGE , RECIEVE_MESSAGE } from "./Types"

export const sendMessage = (data) => (dispatch) =>{
       
        dispatch({
           type:SEND_MESSAGE,
           payload:data
        })
       
}


export const reciveMessage = (data) => (dispatch) =>{
       
    dispatch({
       type:RECIEVE_MESSAGE,
       payload:data
    })
   
}