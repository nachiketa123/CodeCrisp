import { GET_ERROR } from "../Action/Types"

const initialState = {
    error: {}
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERROR:
            return {
                ...state,
                error: { ...action.payload }
            }
        default:
            return state
    }
}

export default errorReducer;