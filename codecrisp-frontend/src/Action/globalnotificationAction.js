import axios from "axios";
import { GLOBAL_NOTIFICATION ,GET_ERROR } from "./Types";



export const global_notification  =  () => (dispatch) =>{
    console.log('hi --> Action')
    axios.get('/api/gnotification/globalnotification')
    .then(res =>{
    
    console.log('hi')
        dispatch({
            type:GLOBAL_NOTIFICATION,
            payload: res.data
        })
        .catch(err =>{
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
        })
    })
    
    
}