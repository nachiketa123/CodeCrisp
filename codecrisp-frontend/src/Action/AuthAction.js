import axios from 'axios';
import {
    GET_USER, GET_ERROR, LOGIN_SUCCESS, LOGOUT_USER
    , GET_ALL_JOB, REMOVE_ALL_EVENTS_FROM_SOCKET
} from './Types';

import {auth , provider} from '../firebase'





/*
    Action creator: Register User
*/
export const signUp = (userData) => (dispatch) => {
    return new Promise((resolve,reject)=>{
        axios.post('/api/user/signup', userData).then(
            res => {
                dispatch({ type: GET_ERROR, payload: (!res.data?.success)?res.data:{} })
                resolve(true)
            }
        ).catch(
            err => {
                if(err.response.data?.userAlreadyExists){
                    alert("Signup failed, User already exists.")
                }
                dispatch({ type: GET_ERROR, payload: err.response.data })
                reject(err)
            }
        )
    })
    
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
    .then( (payload) =>{         
         const newUser = {
            name : payload.additionalUserInfo.profile.name,
            email: payload.additionalUserInfo.profile.email,
            password: payload.additionalUserInfo.profile.id,
            avatar: payload.additionalUserInfo.profile.picture
         }
         
         if(payload.additionalUserInfo.isNewUser){
                try{
                dispatch(signUp(newUser)).then((success)=>{
                    if(success)
                        dispatch(signIn(newUser))
                    else
                        console.error('Login failed try again')
                })
            }catch(err){
                console.error('error here in catch ',err)
            }
                 
        
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

export const deleteAccount = (userEmail) => (dispatch) => {
    axios.delete('/api/user/delete-account',{data:{email: userEmail}})
        .then(res=>{
            
            const user = auth.currentUser;
            if(user){ //deleting google signed in user from firebase
                user.delete().then(()=>{
                    dispatch({
                        type: LOGOUT_USER,
                        payload:{}
                    })
                }).catch(err=>{
                    console.error(err)
                })
            }else{
                dispatch({
                    type: LOGOUT_USER,
                    payload:{}
                })
            }
        }).catch(err=>{
            console.error(err)
        })
}
