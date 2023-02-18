import { POST_LIKE_NOTIFICATION,GET_NOTIFICATION_FROM_SOCKET,GET_ALL_NOTIFICATION_FROM_DB, GET_ERROR,REMOVE_NOTIFICATION_FROM_SOCKET, SET_NOTIFICATION_LOADING_FROM_DB, GET_NOTIFICATION_FROM_DB_AND_PUSH } from "./Types"
import axios from "axios"


export const getNotificationFromSocket = (data) => (dispatch)=>{
    dispatch({
        type:GET_NOTIFICATION_FROM_SOCKET,
        payload: data
    })
}
export const removeNotificationFromSocket = (data) => (dispatch)=>{
    dispatch({
        type: REMOVE_NOTIFICATION_FROM_SOCKET,
        payload: data
    })
}

export const getNotificationFromDB = (data) => (dispatch) =>{

    dispatch({
        type: SET_NOTIFICATION_LOADING_FROM_DB,
        payload:{}
    })
    axios.get(`/api/notification/all-notification/${data}`)
        .then(res=>{
                //On this dispatch it will override the notification array, NOT push the notification in array
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

export const getNotificationFromDBAndPush = (data) => (dispatch) =>{
    dispatch({
        type: SET_NOTIFICATION_LOADING_FROM_DB,
        payload:{}
    })
    console.log('data',data)
    axios.get(`/api/notification/all-notification/${data.user_id}`,{params:{page: data.page}})
        .then(res=>{
                //On this dispatch it will push the notification in array
                dispatch({
                    type: GET_NOTIFICATION_FROM_DB_AND_PUSH,
                    payload: {data:res.data,page: data.page}
                })
            
        }).catch(err=>{
            console.log('in catch',err)
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
    }