import axios from 'axios';
import { GET_USER, GET_ERROR } from './Types';

export const signUp = (userData) => (dispatch) => {
    axios.post('/api/user/signup', userData).then(
        res => {
            dispatch({ type: GET_ERROR, payload: {} })
        }
    ).catch(
        err => {
            dispatch({ type: GET_ERROR, payload: err.response.data })
        }
    )
}


