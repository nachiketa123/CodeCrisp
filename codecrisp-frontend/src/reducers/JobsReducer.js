import { GET_ALL_JOB } from '../Action/Types'

const initialState = {
    isApplied: false,
    jobsData: []
}


const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_JOB:
            return { ...state, jobsData: action.payload }
        default:
            return state;
    }

}


export default jobReducer;