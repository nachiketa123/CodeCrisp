const { GET_FLG_IF_FRIEND_WITH_USER } = require("../Action/Types")

const initialState = {
    isFriendWithUser: false
}

const friendReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_FLG_IF_FRIEND_WITH_USER:
            return{
                ...state,
                isFriendWithUser: action.payload
            }
        default:
            return state
    }
}

export default friendReducer;