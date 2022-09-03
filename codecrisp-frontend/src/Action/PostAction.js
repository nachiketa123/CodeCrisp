import axios from "axios"
import { USER_ADDED_NEW_POST, GET_ERROR, SET_LOADING_ONN,GET_ALL_USER_POST, DELETE_USER_POST, POST_LIKE_NOTIFICATION } from "./Types"

export const addPost = (postData) => (dispatch) =>{
    dispatch({
        type: SET_LOADING_ONN,
        payload:{}
    })
    axios.post('/api/post/addPost',postData)
        .then(res=>{
            dispatch({
                type:USER_ADDED_NEW_POST,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_ERROR,
                payload:err.response.data
            })
        })
}

export const getAllUserPosts = (user_id) => (dispatch)=>{
    dispatch({
        type: SET_LOADING_ONN,
        payload:{}
    })
    axios.get(`/api/post/getAllUserPosts/${user_id}`)
        .then(res=>{
            dispatch({
                type: GET_ALL_USER_POST,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:GET_ERROR,
                payload:err.response.data
            })
        })
}

export const deletePost = (id) => (dispatch)=>{
    dispatch({
        type: DELETE_USER_POST,
        payload: id
    })
}
