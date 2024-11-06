import { POST_LIKE_NOTIFICATION,
    GET_NOTIFICATION_FROM_SOCKET, 
    GET_ALL_NOTIFICATION_FROM_DB, 
    REMOVE_NOTIFICATION_FROM_SOCKET,
    SET_NOTIFICATION_LOADING_FROM_DB,
    GET_NOTIFICATION_FROM_DB_AND_PUSH,
    RESET_NOTIFICATION_DATA,
    GET_COUNT_UNSEEN_NOTIFICATIONS,
    GET_IF_NOTIFICATION_EXISTS,
    RESET_ALL_POST_DATA,
} from "../Action/Types"
import isEmpty from "../utility/is-empty";

const initialState = {
    notification :[],
    number_of_unseen_notif:0,
    moreNotificationAvailable: true,   
    page:0,
    loading: false,
    totalNotification:0,
}
let newNotification = [];
const notificationReducer = ( state = initialState, action) =>{
    switch(action.type){
        case GET_NOTIFICATION_FROM_SOCKET:
            // newNotification = [...new Set([...action.payload?.notification,...state.notification])]
            return {
                ...state,
                // notification: newNotification,
                number_of_unseen_notif: state.number_of_unseen_notif+1
            }
        case REMOVE_NOTIFICATION_FROM_SOCKET:
            // newNotification = [...action.payload.notification]
            return {
                ...state,
                // notification: newNotification,
                number_of_unseen_notif: (state.number_of_unseen_notif-1<=0) ? 0 : state.number_of_unseen_notif-1
            }
        case GET_ALL_NOTIFICATION_FROM_DB:
            newNotification = []
            if(action.payload.notification)
                newNotification = action.payload.notification
            return {
                ...state,
                notification: newNotification,
                moreNotificationAvailable: !isEmpty(newNotification),
                // page: action.payload.page,
                loading:false
            }
        case GET_NOTIFICATION_FROM_DB_AND_PUSH:
            newNotification = [...new Set([...action.payload?.data?.notification,...state.notification])]
            return {
                ...state,
                notification: newNotification,
                moreNotificationAvailable: !isEmpty(action.payload?.data?.notification),
                // page: action.payload.page,
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
        case RESET_NOTIFICATION_DATA:
            return {
                ...state,
                notification:[]
            }
        case GET_IF_NOTIFICATION_EXISTS:
            return {
                ...state,
                totalNotification: action.payload.totalNotification
            }
        default:
            return state
    }
}

export default notificationReducer;