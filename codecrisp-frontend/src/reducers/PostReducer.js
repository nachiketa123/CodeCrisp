import { GET_ALL_USER_POST, SET_LOADING_ONN, USER_ADDED_NEW_POST } from "../Action/Types";

const initialState = {
    allUserPosts:[],
    newPost:{},
    loading: false
}
const PostReducer = (state = initialState,action) =>{
    switch(action.type){
        case USER_ADDED_NEW_POST:
            return {
                ...state,
                newPost:action.payload,
                allUserPosts:[...state.allUserPosts,action.payload],
                loading:false
            }
        case GET_ALL_USER_POST:
            return{
                ...state,
                allUserPosts:action.payload,
                loading:false
            }
        case SET_LOADING_ONN:
            return {
                ...state,
                loading:true
            }
        default:
            return state;
    }
}

export default PostReducer;