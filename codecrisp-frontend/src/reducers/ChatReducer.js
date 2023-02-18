import { RECIEVE_MESSAGE, SEND_MESSAGE } from "../Action/Types"

const initialState = {allMessages:[] , newMessages:""}

export const chatReducer = (state  =  initialState , action) =>{
  
  switch(action.type){
       
       case SEND_MESSAGE:
         return {
           ...state , allMessages:[...state.allMessages , action.payload] , newMessages:action.payload
         }
        case RECIEVE_MESSAGE:
            return {
                ...state , allMessages:[...state.allMessages , action.payload] , newMessages:action.payload
              }
              
       default:
        return state
  }

}