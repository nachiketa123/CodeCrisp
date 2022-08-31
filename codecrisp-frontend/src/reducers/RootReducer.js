import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import searchReducer from './SearchReducer';
import jobReducer from './JobsReducer';
import PostReducer from './PostReducer';
import errorReducer from './ErrorReducer';
import profileReducer from './ProfileReducer';
import friendReducer from './FriendReducer';

const rootReducer = combineReducers(
    { authRed: authReducer, 
        searchRed: searchReducer, 
        postReducer: PostReducer,
        jobReducer,
        errorReducer: errorReducer,
        profileReducer: profileReducer,
        friendReducer: friendReducer
        
     }
)

export default rootReducer;
