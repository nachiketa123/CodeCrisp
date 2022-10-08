import axios from "axios"
import { GET_ERROR, SET_USER_PROFILE_PICTURE,SET_USER_PROFILE_PICTURE_LOADING_ONN,SET_USER_PROFILE_PICTURE_LOADING_OFF,
    GET_USER_PROFILE, 
    SET_PROFILE_PAGE_LOADING_ONN} from "./Types"

export const changeMyProfilePicture = (user_data) => (dispatch) =>{
    dispatch({
        type:SET_USER_PROFILE_PICTURE_LOADING_ONN,
        payload:{}
    })
    axios.post('/api/user/update-profile-picture',user_data)
        .then(res=>{

            //For now dispatching to user_auth_reducer but in future we can change it to profile reducer
            dispatch({
                type:SET_USER_PROFILE_PICTURE,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERROR,
                payload:err.response.data
            })
    })
}

export const setProfilePictureLoadingOff =()=> (dispatch)=>{
    dispatch({
        type: SET_USER_PROFILE_PICTURE_LOADING_OFF,
        payload:{}
    })
}

export const getProfileForUser = (user_id) => (dispatch) =>{
    dispatch({
        type: SET_PROFILE_PAGE_LOADING_ONN,
        payload: {}
    })
    axios.get(`/api/user-profile/get-profile/${user_id}`)
        .then(res=>{
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data 
            })
        })
        .catch(err=>{
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
    
}