import { GET_COUNT_UNSEEN_NOTIFICATIONS,RESET_NOTIFICATION_DATA,GET_NOTIFICATION_FROM_SOCKET,GET_ALL_NOTIFICATION_FROM_DB, GET_ERROR,REMOVE_NOTIFICATION_FROM_SOCKET, SET_NOTIFICATION_LOADING_FROM_DB, GET_NOTIFICATION_FROM_DB_AND_PUSH } from "./Types"
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

export const getCountOfUnseenNotification = (user_id) => (dispatch) =>{
    dispatch({
        type:SET_NOTIFICATION_LOADING_FROM_DB,
        payload:{}
    })
    axios.get(`/api/notification/new-notif/${user_id}`)
        .then(res=>{
            dispatch({
                type: GET_COUNT_UNSEEN_NOTIFICATIONS,
                payload: res.data
            })
        }).catch(err=>{
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}

export const resetNotificationData = () => (dispatch)=>{
    dispatch({
        type: RESET_NOTIFICATION_DATA,
        payload:{}
    })
}