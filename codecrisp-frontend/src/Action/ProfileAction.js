import axios from "axios"
import { GET_ERROR, SET_USER_PROFILE_PICTURE,SET_USER_PROFILE_PICTURE_LOADING_ONN } from "./Types"

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