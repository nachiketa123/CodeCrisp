import axios from "axios";
import { GLOBAL_NOTIFICATION ,GET_ERROR } from "./Types";



export const global_notification  =  () => (dispatch) =>{
    axios.get('/api/gnotification/globalnotification')
    .then(res =>{
        if(res.data){
            dispatch({
                type:GLOBAL_NOTIFICATION,
                payload: res.data
            })
        }
        else{
            dispatch({
                type: GET_ERROR,
                payload: {gnotification_error:'Something went wrong'}
            })
        }
    }).catch(err=>{
        dispatch({
            type: GET_ERROR,
            payload: err.response.data
        })
    })
    
    
}