import { SET_SOCKET, REMOVE_ALL_EVENTS_FROM_SOCKET } from "../Action/Types"

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
        case REMOVE_ALL_EVENTS_FROM_SOCKET:
            state.socket?.removeAllListeners()
            return {
                ...state,
                socket:{}
            }
        default:
            return state
    }
}

export default socketReducer;