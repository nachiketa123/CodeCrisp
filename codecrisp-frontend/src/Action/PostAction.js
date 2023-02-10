import axios from "axios"
import { USER_ADDED_NEW_POST, GET_ERROR, SET_LOADING_ONN, GET_ALL_USER_POST, ADD_COMMENT, DELETE_USER_POST, POST_LIKE_NOTIFICATION, LIKE_POST } from "./Types"

 

export const addPost = (postData) => (dispatch) => {
    dispatch({
        type: SET_LOADING_ONN,
        payload: {}
    })
    axios.post('/api/post/addPost', postData)
        .then(res => {
            dispatch({
                type: USER_ADDED_NEW_POST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}

export const getAllUserPosts = (loadData) => (dispatch) => {
    dispatch({
        type: SET_LOADING_ONN,
        payload: {}
    })
    axios.get(`/api/post/getAllUserPosts1/${loadData.user_id}`,{params:{page:loadData.page}})
        .then(res => {
            dispatch({
                type: GET_ALL_USER_POST,
                payload: {data:res.data,page:loadData.page}
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}

export const deletePost = (id) => (dispatch) => {
    dispatch({
        type: DELETE_USER_POST,
        payload: id
    })
}
export const addLike = (userData) => (dispatch) => {

    axios.post('/api/post/likePost', userData).then(
        res => {
            dispatch({ type: LIKE_POST, payload: res.data })
        }

    )


}


export const addComment = (commentData) => (dispatch) => {
    
    axios.post(`/api/post/add-comment/${commentData.id}`, commentData.data).then(
        res => {
            if (res.data.success === true) {
                dispatch({ type: ADD_COMMENT, payload: commentData })
            }

        }
    )
}
