import axios from "axios";
import { GET_ERROR, GET_FLG_IF_FRIEND_WITH_USER, GET_FRIEND_LIST, GET_ALL_NOTIFICATION_FROM_DB} from "./Types";

export const sendFriendRequest = () => (dispatch) => {
    dispatch({
        type:GET_FLG_IF_FRIEND_WITH_USER,
        payload: 0
    })
}

export const acceptFriendRequest = (user_data) => (dispatch) =>{
    axios.patch('/api/friend/acceptFriendRequest',user_data)
        .then(res=>{

            dispatch({
                type:GET_FLG_IF_FRIEND_WITH_USER,
                payload: 1
            })

            dispatch({
                type: GET_ALL_NOTIFICATION_FROM_DB,
                payload: res.data.payload
            })
        })
        .catch(err=>{
            console.log('Error ',err.response.data)
        })
}

export const sendUnFriendRequest = (user_data) =>(dispatch)=>{
    axios.post('/api/friend/sendUnFriendRequest',user_data)
        .then(res=>{
            dispatch({
                type:GET_FLG_IF_FRIEND_WITH_USER,
                payload: -1
            })
        })
        .catch(err=>{
            console.log('Error ',err.response.data)
        })
}

export const checkIfFriendWithUser = (user_data) => (dispatch)=>{
    axios.get('/api/friend/check-if-friend-with-user', { params : {...user_data} })
        .then(res=>{
            dispatch({
                type:GET_FLG_IF_FRIEND_WITH_USER,
                payload: res.data
            })
        }).catch(err=>{
            console.log(err)
        })
}

export const getMyFriendList = (user_id) =>(dispatch)=>{
    axios.get(`/api/friend/get-friend-list/${user_id}`)
        .then(res=>{
            dispatch({
                type: GET_FRIEND_LIST,
                payload: res.data
            })
        }).catch(err=>{
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
}
