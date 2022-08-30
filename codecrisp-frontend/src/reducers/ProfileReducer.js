import { GET_USER_PROFILE } from "../Action/Types";

const initialState = {
    user_profile : {}
}

const profileReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_USER_PROFILE:
            return {
                ...state,
                user_profile: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;