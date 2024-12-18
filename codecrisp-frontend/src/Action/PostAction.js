import axios from "axios"
import { 
    USER_ADDED_NEW_POST, 
    GET_ERROR, 
    SET_LOADING_ONN, 
    GET_ALL_USER_POST, 
    ADD_COMMENT, 
    DELETE_USER_POST, 
    POST_LIKE_NOTIFICATION, 
    LIKE_POST, 
    POST_DATA, 
    CONFIRM_EDIT_COMMENT,
    DELETE_POST_COMMENT,
} from "./Types"

 

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
            dispatch({ type: LIKE_POST, payload: userData })
        }

    )


}

export const addCommentRealTimeOnNotification = (commentData) => (dispatch) =>{
    dispatch({ type: ADD_COMMENT, payload: commentData })
}


export const addComment = (commentData) => (dispatch) => {
    
    axios.post(`/api/post/add-comment/${commentData.id}`, commentData.data).then(
        res => {
            if (res.data.success === true) {
                dispatch({ type: ADD_COMMENT, payload:{postId: commentData.id, newComment: res.data.payload }})
            }

        }
    )
}

 
export const postData = (id) => (dispatch) =>{
    
    
    axios.get(`/api/post/post/${id}`).then(
      res =>{ 
    
            dispatch({type:POST_DATA , payload:res.data})
      }
    )
}

export const editCommentById = (data) => (dispatch) =>{
    axios.post('/api/post/edit-post-comment',data)
        .then(res=>{
            if(res.data.success === true){
                dispatch({
                    type: CONFIRM_EDIT_COMMENT,
                    payload: data
                })
            }else{
                console.log(res.data)
            }
            
        }).catch(err=>{
            dispatch({type: GET_ERROR, payload: err.response.data})
        })
}

export const deleteCommentFromPost = (data) => (dispatch) =>{
    axios.patch('/api/post/delete-post-comment',data)
        .then(res=>{
            if(res.data.success === true){
                dispatch({
                    type: DELETE_POST_COMMENT,
                    payload: data
                })
            }
            else{
                console.log(res.data)
            }
            
        }).catch(err=>{
            console.log(err)
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}