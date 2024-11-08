import { GET_ALL_MESSAGES_OF_FRIEND, RECIEVE_MESSAGE, RESET_CHAT_MESSAGES, SEND_MESSAGE, SET_CHAT_MESSAGES_LOADING } from "../Action/Types"
import isEmpty from "../utility/is-empty"

const initialState = {
  allMessages:{messages:[],page:0} , 
  newMessages:"",
  moreDataAvailable: true
}

export const chatReducer = (state  =  initialState , action) =>{
  
  switch(action.type){
       
       case SEND_MESSAGE:
         return {
           ...state 
           ,allMessages:{
              messages:[...state.allMessages.messages, action.payload],
              page: state.allMessages.page,
            } 
            , newMessages:action.payload.text
         }
        case RECIEVE_MESSAGE:
            return {
                ...state 
                , allMessages:{
                    messages:[...state.allMessages.messages , action.payload],
                    page: state.allMessages.page,
                  }
                , newMessages:action.payload.text
              }
        case GET_ALL_MESSAGES_OF_FRIEND:
              if(!action.payload)
                action.payload = {messages: [], page:0}
              return {
                moreDataAvailable: !isEmpty(action.payload.messages),
                allMessages : {
                  messages:[...action.payload.messages,...state.allMessages.messages],
                  page: action.payload.page
                }
              }
        case RESET_CHAT_MESSAGES:
          return {
            ...state,
            allMessages :{
              messages:[],
              page: 0
            },
            moreDataAvailable:false,
          }
        case SET_CHAT_MESSAGES_LOADING:
          return {
            ...state,
            loading:action.payload
          }
              
       default:
        return state
  }

}