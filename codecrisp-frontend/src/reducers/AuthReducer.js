import { GET_USER, GET_ERROR, LOGIN_SUCCESS, SET_USER, LOGOUT_USER } from '../Action/Types';

const initialState = {
    isAuthenticated: false
    , user: {}
    , token: ""
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
                            return {
                                ...state
                                ,...action.payload
                                , isAuthenticated: true
                            }
        case SET_USER:      
                            return {
                                ...state,
                                user: action.payload
                            }

        case LOGOUT_USER:
                            return {
                                ...state,
                                user:{},
                                isAuthenticated: false,
                                token:"",
                            }
        default: return state;

    }
}


export default authReducer;