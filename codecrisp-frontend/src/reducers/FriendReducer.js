import isEmpty from "../utility/is-empty"

const { GET_FLG_IF_FRIEND_WITH_USER, GET_FRIEND_LIST } = require("../Action/Types")

const initialState = {
    isFriendWithUser: false,
    friend_list:[]
}

const friendReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_FLG_IF_FRIEND_WITH_USER:
            return{
                ...state,
                isFriendWithUser: isEmpty(action.payload)?[]:action.payload
            }
        case GET_FRIEND_LIST:
            return {
                ...state,
                friend_list:action.payload
            }
        default:
            return state
    }
}

export default friendReducer;