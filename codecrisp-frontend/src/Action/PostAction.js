import axios from "axios"
import { USER_ADDED_NEW_POST, GET_ERROR, SET_LOADING_ONN } from "./Types"

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