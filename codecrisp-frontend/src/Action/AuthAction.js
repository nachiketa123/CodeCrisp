import axios from 'axios';
import { GET_USER, GET_ERROR, LOGIN_SUCCESS } from './Types';


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

export const signIn = (userData) => (dispatch) => {
    axios.post('/api/user/login', userData).then(
        res => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        }
    ).catch(
        err => {
            dispatch({ type: GET_ERROR, payload: err.response.data })
        }
    )
}


