import axios from 'axios';
import { GET_USER, GET_ERROR, LOGIN_SUCCESS, LOGOUT_USER, GET_ALL_JOB, REMOVE_ALL_EVENTS_FROM_SOCKET } from './Types';


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
            alert("Incorrect Password")
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
    // console.log('logout')

    //handled in socket reducer
    dispatch({
        type: REMOVE_ALL_EVENTS_FROM_SOCKET,
        payload:true
    })
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    })
}

