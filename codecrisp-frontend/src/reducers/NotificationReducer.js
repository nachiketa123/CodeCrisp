import { POST_LIKE_NOTIFICATION,
    GET_NOTIFICATION_FROM_SOCKET, 
    GET_ALL_NOTIFICATION_FROM_DB, 
    REMOVE_NOTIFICATION_FROM_SOCKET,
    SET_NOTIFICATION_LOADING_FROM_DB,
    GET_NOTIFICATION_FROM_DB_AND_PUSH,
    GET_COUNT_UNSEEN_NOTIFICATIONS,
} from "../Action/Types"
import isEmpty from "../utility/is-empty";

const initialState = {
    notification :[],
    number_of_unseen_notif:0,
    moreNotificationAvailable: true,   
    page:0,
    loading: false,
}
let newNotification = [];
const notificationReducer = ( state = initialState, action) =>{
    switch(action.type){
        case GET_NOTIFICATION_FROM_SOCKET:
            newNotification = [...action.payload?.notification,...state.notification]
            return {
                ...state,
                notification: newNotification,
                number_of_unseen_notif: newNotification.filter(obj=> !obj?.seen).length
            }
        case REMOVE_NOTIFICATION_FROM_SOCKET:
            newNotification = [...action.payload.notification]
            return {
                ...state,
                notification: newNotification,
                number_of_unseen_notif: newNotification.filter(obj=> !obj?.seen).length,
            }
        case GET_ALL_NOTIFICATION_FROM_DB:
            newNotification = []
            if(action.payload.notification)
                newNotification = action.payload.notification
            return {
                ...state,
                notification: newNotification,
                number_of_unseen_notif: newNotification.filter(obj=> !obj?.seen).length,
                moreNotificationAvailable: !isEmpty(newNotification),
                page: action.payload.page,
                loading:false
            }
        case GET_NOTIFICATION_FROM_DB_AND_PUSH:
            newNotification = [...action.payload?.data?.notification,...state.notification]
            return {
                ...state,
                notification: newNotification,
                number_of_unseen_notif: newNotification.filter(obj=> !obj?.seen).length,
                moreNotificationAvailable: !isEmpty(action.payload?.data?.notification),
                page: action.payload.page,
                loading:false
            }
        case SET_NOTIFICATION_LOADING_FROM_DB:
            return {
                ...state,
                loading: true
            }
        case GET_COUNT_UNSEEN_NOTIFICATIONS:
            return{
                ...state,
                number_of_unseen_notif: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default notificationReducer;