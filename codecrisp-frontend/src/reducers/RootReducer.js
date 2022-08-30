import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import searchReducer from './SearchReducer';
import jobReducer from './JobsReducer';
import PostReducer from './PostReducer';
import errorReducer from './ErrorReducer';
import profileReducer from './ProfileReducer';

const rootReducer = combineReducers(
    { authRed: authReducer, 
        searchRed: searchReducer, 
        postReducer: PostReducer,
        jobReducer,
        errorReducer: errorReducer,
        profileReducer: profileReducer
        
     }
)

export default rootReducer;
