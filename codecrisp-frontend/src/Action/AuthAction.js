import axios from 'axios';
import {
    GET_USER, GET_ERROR, LOGIN_SUCCESS, LOGOUT_USER
    , GET_ALL_JOB, REMOVE_ALL_EVENTS_FROM_SOCKET,SIGN_IN_WITH_GOOGLE
} from './Types';

import {auth , provider} from '../firebase'




/*
    Action creator: Register User
*/
export const signUp = (userData) => (dispatch) => {
    axios.post('/api/user/signup', userData).then(
        res => {
            dispatch({ type: GET_ERROR, payload: (!res.data?.success)?res.data:{} })
        }
    ).catch(
        err => {
            if(err.response.data?.userAlreadyExists){
                alert("Signup failed, User already exists.")
            }
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
            Promise.all([
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                }),
                dispatch({
                    type: GET_ERROR,
                    payload: {},
                })
            ])
        }
    ).catch(
        err => {
            dispatch({
                type: GET_ERROR,
                payload: err.response.data,
            })
        }
    )
}

export const signInWithGoogle = () => (dispatch) =>{
   
    auth.signInWithPopup(provider)
    .then((payload) =>{         
         const newUser = {
            name : payload.additionalUserInfo.profile.name,
            email: payload.additionalUserInfo.profile.email,
            password: payload.additionalUserInfo.profile.id,
            avatar: payload.additionalUserInfo.profile.picture
         }
         
         if(payload.additionalUserInfo.isNewUser){
                 dispatch(signUp(newUser));
                 dispatch(signIn(newUser));
         }
         else{
         
            const newUserGoogle = {       
                email: payload.additionalUserInfo.profile.email,
                password: payload.additionalUserInfo.profile.id
             }
             
         dispatch(signIn(newUserGoogle));
       }
    })}



/*
    Action creator: Log out User
*/
export const logOutUser = () => (dispatch) => {
    // console.log('logout')

    //handled in socket reducer
    dispatch({
        type: REMOVE_ALL_EVENTS_FROM_SOCKET,
        payload: true
    })
    dispatch({
        type: LOGOUT_USER,
        payload: {}
    })
}

