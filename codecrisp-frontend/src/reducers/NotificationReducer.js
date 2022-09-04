import { POST_LIKE_NOTIFICATION,GET_NOTIFICATION_FROM_SOCKET, GET_ALL_NOTIFICATION_FROM_DB} from "../Action/Types"

const initialState = {
    notification :[]     
}
let newNotification = [];
const notificationReducer = ( state = initialState, action) =>{
    switch(action.type){
        case GET_NOTIFICATION_FROM_SOCKET:
            newNotification = [...action.payload?.notification,...state.notification].filter(obj=> !obj?.seen)
            return {
                ...state,
                notification: newNotification
            }
        case GET_ALL_NOTIFICATION_FROM_DB:
            newNotification = action.payload.notification.filter(obj=> !obj?.seen)
            return {
                ...state,
                notification: newNotification
            }
        default:
            return state
    }
}

export default notificationReducer;