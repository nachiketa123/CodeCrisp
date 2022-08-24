import axios from 'axios';
import { GET_USER, GET_ERROR, LOGIN_SUCCESS, LOGOUT_USER } from './Types';


/*
    Action creator: Register User
*/
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

/*
    Action creator: Login User
*/
export const signIn = (userData) => (dispatch) => {
    axios.post('/api/user/login', userData).then(
        res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }
    ).catch(
        err => {
            console.log('error', err)
            dispatch({
                type: GET_ERROR,
                payload: err.response.data,
            })
        }
    )
}


/*
    Action creator: Log out User
*/
export const logOutUser = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    })
}