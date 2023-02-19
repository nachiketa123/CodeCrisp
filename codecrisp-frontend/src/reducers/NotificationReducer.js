import { POST_LIKE_NOTIFICATION,
    GET_NOTIFICATION_FROM_SOCKET, 
    GET_ALL_NOTIFICATION_FROM_DB, 
    REMOVE_NOTIFICATION_FROM_SOCKET,
    SET_NOTIFICATION_LOADING_FROM_DB,
    GET_NOTIFICATION_FROM_DB_AND_PUSH
} from "../Action/Types"
import isEmpty from "../utility/is-empty";

const initialState = {
    notification :[],
    moreNotificationAvailable: true,   
    page:0,
    loading: false,
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
        case REMOVE_NOTIFICATION_FROM_SOCKET:
            newNotification = [...action.payload.notification].filter(obj=> !obj?.seen)
            return {
                ...state,
                notification: newNotification
            }
        case GET_ALL_NOTIFICATION_FROM_DB:
            newNotification = []
            if(action.payload.notification)
                newNotification = action.payload.notification.filter(obj=> !obj?.seen)
            return {
                ...state,
                notification: newNotification,
                moreNotificationAvailable: !isEmpty(newNotification),
                page: action.payload.page,
                loading:false
            }
        case GET_NOTIFICATION_FROM_DB_AND_PUSH:
            newNotification = [...action.payload?.data?.notification,...state.notification].filter(obj=> !obj?.seen)
            return {
                ...state,
                notification: newNotification,
                moreNotificationAvailable: !isEmpty(action.payload?.data?.notification),
                page: action.payload.page,
                loading:false
            }
        case SET_NOTIFICATION_LOADING_FROM_DB:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default notificationReducer;