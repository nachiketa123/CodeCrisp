import axios from "axios";
import { GET_ERROR, GET_FLG_IF_FRIEND_WITH_USER, GET_FRIEND_LIST} from "./Types";


export const SendFriendRequest = (user_data) => (dispatch) =>{

    axios.post('/api/friend/sendFriendRequest',user_data)
        .then(res=>{
            console.log('request sent ',res)
            dispatch({
                type:GET_FLG_IF_FRIEND_WITH_USER,
                payload: true
            })
        })
        .catch(err=>{
            console.log('Error ',err.response.data)
        })
}

export const sendUnFriendRequest = (user_data) =>(dispatch)=>{
    axios.post('/api/friend/sendUnFriendRequest',user_data)
        .then(res=>{
            console.log(res.data)
            dispatch({
                type:GET_FLG_IF_FRIEND_WITH_USER,
                payload: false
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
