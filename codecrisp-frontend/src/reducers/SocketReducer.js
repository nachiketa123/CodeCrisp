import { SET_SOCKET } from "../Action/Types"

const initialState = {
    socket: {}
}

const socketReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_SOCKET: 
            return {
                ...state,
                socket: action.payload
            }
        default:
            return state
    }
}

export default socketReducer;