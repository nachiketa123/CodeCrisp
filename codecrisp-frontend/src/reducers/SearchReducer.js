import { SEARCH_RESULT } from '../Action/Types'

const initialState = {
    user: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESULT:
            return { ...state, user: action.payload }
        default:
            return state;

    }

}

export default searchReducer;