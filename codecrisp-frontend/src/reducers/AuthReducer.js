import { GET_USER, GET_ERROR, LOGIN_SUCCESS } from '../Action/Types';

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
                , isAuthenticated: true
                , token: action.payload


            }


        default: return state;

    }
}


export default authReducer;