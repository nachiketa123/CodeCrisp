import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import searchReducer from './SearchReducer';
import jobReducer from './JobsReducer';
import PostReducer from './PostReducer';
import errorReducer from './ErrorReducer';
import profileReducer from './ProfileReducer';
import friendReducer from './FriendReducer';
import socketReducer from './SocketReducer';
import notificationReducer from './NotificationReducer';
import globalNotificationReducer from './globalNotificationReducer';
import {chatReducer} from './ChatReducer';

const rootReducer = combineReducers(
    { authRed: authReducer, 
        searchRed: searchReducer, 
        postReducer: PostReducer,
        jobReducer,
        errorReducer: errorReducer,
        profileReducer: profileReducer,
        friendReducer: friendReducer,
        socketReducer: socketReducer,
        notificationReducer: notificationReducer,
        globalNotification:globalNotificationReducer,
        chatreducer:chatReducer
        
     }
)

export default rootReducer;
