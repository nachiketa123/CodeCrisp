import { GET_USER, GET_ERROR, LOGIN_SUCCESS, SET_USER, LOGOUT_USER, SET_USER_PROFILE_PICTURE, SET_USER_PROFILE_PICTURE_LOADING_ONN } from '../Action/Types';
import isEmpty from '../utility/is-empty';

const initialState = {
    isAuthenticated: false
    , user: {}
    , token: localStorage.getItem("token")
    ,loadingForProfilePictureChange:false
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
                                user: action.payload,
                                isAuthenticated: !isEmpty(action.payload)
                            }

        case LOGOUT_USER:
                            return {
                                ...state,
                                user:{},
                                isAuthenticated: false,
                                token:"",
                            }
        case SET_USER_PROFILE_PICTURE:
                            return {
                                ...state,
                                user:{
                                    ...state.user,
                                    avatar: action.payload
                                },
                                loadingForProfilePictureChange: false
                            }
        case SET_USER_PROFILE_PICTURE_LOADING_ONN:
                            return {
                                ...state,
                                loadingForProfilePictureChange: true
                            }
                            
        default: return state;

    }
}


export default authReducer;