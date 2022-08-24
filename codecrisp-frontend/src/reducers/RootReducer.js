import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import searchReducer from './SearchReducer';
import jobReducer from './JobsReducer';
const rootReducer = combineReducers(
    { authRed: authReducer, searchRed: searchReducer, jobReducer }
)

export default rootReducer;
