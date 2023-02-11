import isEmpty from "../utility/is-empty"

const { GET_FLG_IF_FRIEND_WITH_USER, GET_FRIEND_LIST } = require("../Action/Types")

const initialState = {
    // -1 means not a friend, 0 means friend request has been sent and 1 means is a friend
    isFriendWithUser: -1,
    friend_list:[]
}

const friendReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_FLG_IF_FRIEND_WITH_USER:
            return{
                ...state,
                isFriendWithUser: isEmpty(action.payload)?state.isFriendWithUser:action.payload
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