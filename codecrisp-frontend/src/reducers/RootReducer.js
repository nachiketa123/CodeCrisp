import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import searchReducer from './SearchReducer';

const rootReducer = combineReducers(
    { authRed: authReducer, searchRed: searchReducer }
)

export default rootReducer;
