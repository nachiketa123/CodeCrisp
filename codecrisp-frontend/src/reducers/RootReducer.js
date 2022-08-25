import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import searchReducer from './SearchReducer';
import jobReducer from './JobsReducer';
import PostReducer from './PostReducer';

const rootReducer = combineReducers(
    { authRed: authReducer, 
        searchRed: searchReducer, 
        postReducer: PostReducer,
        jobReducer,
        
     }
)

export default rootReducer;
