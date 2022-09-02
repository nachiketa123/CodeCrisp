import { POST_LIKE_NOTIFICATION } from "../Action/Types"

const initialState = {
    notification :[]     
}

const notificationReducer = ( state = initialState, action) =>{
    switch(action.type){
        case POST_LIKE_NOTIFICATION:
            return {
                ...state,
                notification: [...state.notification,action.payload]
            }
        default:
            return state
    }
}

export default notificationReducer;