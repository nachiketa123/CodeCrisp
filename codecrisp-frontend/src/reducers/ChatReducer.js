import { GET_ALL_MESSAGES_OF_FRIEND, RECIEVE_MESSAGE, SEND_MESSAGE } from "../Action/Types"

const initialState = {allMessages:[] , newMessages:""}

export const chatReducer = (state  =  initialState , action) =>{
  
  switch(action.type){
       
       case SEND_MESSAGE:
         return {
           ...state , allMessages:[...state.allMessages, action.payload] , newMessages:action.payload.text
         }
        case RECIEVE_MESSAGE:
            console.log(action.payload)
            return {
                ...state , allMessages:[...state.allMessages , action.payload] , newMessages:action.payload.text
              }
        case GET_ALL_MESSAGES_OF_FRIEND:
              if(!action.payload)
                action.payload = []
              return {
                allMessages : [...action.payload]
              }
              
       default:
        return state
  }

}