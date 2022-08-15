import { combineReducers } from 'redux';
import authReducer from './AuthReducer';

const rootReducer = combineReducers(
    { authRed: authReducer }
)

export default rootReducer;
