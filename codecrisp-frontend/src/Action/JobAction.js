import axios from "axios";
import { GET_ALL_JOB, GET_ERROR } from "./Types";


export const getAllJobs = () => (dispatch) =>{
    console.log('getAllJobs is called');
    axios.get('/api/jobs').then(
        res=>{
            dispatch({
                type: GET_ALL_JOB,
                payload: res.data
            })
        }
    ).catch(
        err=>{
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
            console.log('getAllJobs Error ',err.response.data)
        }
        )
}