import React, { useEffect, useState } from 'react'
import '../Jobs/Job.css'
import { getAllJobs } from '../../Action/JobAction';
import { connect } from 'react-redux';
import Header from '../Header';
import JobDetailRight from './JobDetailRight';
import {  useNavigate } from 'react-router-dom'
import extractUserIdFromURL from '../../utility/UrlidExtract';
import axios from 'axios';
import myStore from '../../Store';
import { GET_ERROR } from '../../Action/Types';
import PropTypes from 'prop-types';


function JobDetails({ jobReducer, getAllJobs }) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        jobtitle: "",
        jobdescription: "",
        company: ""
    });

    useEffect(()=>{
        getAllJobs()
        setTheStateForRightComponentUsingURL()
    },[])


    const setTheStateForRightComponentUsingURL = async ()=>{
        const searchId = await extractUserIdFromURL();
        try{
            const res = await axios.get(`/api/jobs/${searchId}`)
            await setState({
                ...state,
                jobtitle: res.data.jobname,
                jobdescription: res.data.jobdesc,
                company: res.data.company
            })
        }catch(err){
            //Page not found error
            myStore.dispatch({
                type:GET_ERROR,
                payload: err.response.data
            })
        }
    }
    const clickJobDetails = (event,id) => {
        navigate(`/jobs/${id}`)
        setTheStateForRightComponentUsingURL();
    }



    return (
        <>
            <Header />
            <div className="JobDetailsBoxBackground" >
                <div className="JobDetailsBox">

                    {/* left : Scroll All Jobs  */}
                    <div className="JobDetails-left">
                        <h3
                            className='JobDetails-left-title'>  Jobs based on your Profile</h3>
                        {jobReducer.jobsData.map(e => (<li key={e._id} className="list-group-item"><img
                            onClick={event=>clickJobDetails(event,e._id)}
                            className='image-search'
                            src={require('../../images/amazon_logo.png')}
                            alt="search_image" />
                            <a className='company' onClick={event=>clickJobDetails(event,e._id)} >{e.company} </a>
                            <a className='jobname' onClick={event=>clickJobDetails(event,e._id)}>{e.jobname}</a>
                        </li>))}

                    </div>
                    {/* Right : Selected Job details  */}

                    <JobDetailRight jobtitle={state.jobtitle} jobdescription={state.jobdescription} company={state.company} />
                </div>
            </div>
        </>)
}

JobDetails.propTypes = {
    getAllJobs: PropTypes.func.isRequired,
    jobReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    jobReducer: state.jobReducer
});


export default connect(mapStateToProps, {getAllJobs})(JobDetails)





