import axios from 'axios';
import { GET_ALL_JOB } from './Types';

export const jobDetails = () => (dispatch) => {


    console.log("aagya")
    axios.get('/api/jobs').then(

        jobsData => {
            console.log(jobsData);
            dispatch({ type: GET_ALL_JOB, payload: jobsData.data });
        }
    )

}

