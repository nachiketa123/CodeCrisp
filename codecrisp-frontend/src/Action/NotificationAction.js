import { POST_LIKE_NOTIFICATION,GET_NOTIFICATION_FROM_SOCKET,GET_ALL_NOTIFICATION_FROM_DB, GET_ERROR } from "./Types"
import axios from "axios"


export const getNotificationFromSocket = (data) => (dispatch)=>{
    dispatch({
        type:GET_NOTIFICATION_FROM_SOCKET,
        payload: data
    })
}

export const getNotificationFromDB = (user_id) => (dispatch) =>{
    axios.get(`/api/notification/all-notification/${user_id}`)
        .then(res=>{
                dispatch({
                    type: GET_ALL_NOTIFICATION_FROM_DB,
                    payload: res.data
                })
            
        }).catch(err=>{
            console.log('in catch',err)
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}