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
console.log("agaya")
    axios.post('/api/user/signup', userData).then(
        res => {
            dispatch({ type: GET_ERROR, payload: (!res.data?.success)?res.data:{} })
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

export const signInWithGoogle = () => (dispatch) =>{
   
    auth.signInWithPopup(provider)
    .then((payload) =>{
         
         console.log(payload);
         
         const newUser = {
            name : payload.additionalUserInfo.profile.name,
            email: payload.additionalUserInfo.profile.email,
            password: payload.additionalUserInfo.profile.id,
            avatar: payload.additionalUserInfo.profile.picture
         }
         
         if(payload.additionalUserInfo.isNewUser){
              signUp(newUser);
         }
         else{
         
            const newUserGoogle = {       
                email: payload.additionalUserInfo.profile.email,
                password: payload.additionalUserInfo.profile.id
             }
             
             signIn(newUserGoogle);
         }
        
         
    
         console.log(payload); 
    })
    .catch(err =>{ alert(err.message)}); 
 }



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

