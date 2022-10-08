import { GET_USER_PROFILE, SET_PROFILE_PAGE_LOADING_ONN } from "../Action/Types";

const initialState = {
    user_profile : {},
    profile_page_loading:false
}

const profileReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_USER_PROFILE:
            return {
                ...state,
                user_profile: action.payload,
                profile_page_loading: false
            }
        case SET_PROFILE_PAGE_LOADING_ONN:
            return {
                ...state,
                profile_page_loading: true
            }
        default:
            return state;
    }
}

export default profileReducer;