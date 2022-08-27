import React, { useEffect, useState } from 'react'
import '../Jobs/Job.css'
import { getAllJobs } from '../../Action/JobAction';
import { connect } from 'react-redux';
import Header from '../Header';
import JobDetailRight from './JobDetailRight';
import { Link } from 'react-router-dom'
import extractUserIdFromURL from '../../utility/UrlidExtract';
import axios from 'axios';
function JobDetails({ jobReducer }) {

    const [state, setState] = useState({
        jobtitle: "",
        jobdescription: "",
        company: ""
    });


    const clickJobDetails = () => {
        const searchId = extractUserIdFromURL();

        axios.get(`/api/jobs/${searchId}`).then(
            res => {
                setState({
                    ...state,
                    jobtitle: res.data.jobname,
                    jobdescription: res.data.jobdesc,
                    company: res.data.company
                })
            }
        )




    }



    return (
        <>
            <Header />
            <div div className="JobDetailsBoxBackground" >
                <div className="JobDetailsBox">

                    {/* left : Scroll All Jobs  */}
                    <div className="JobDetails-left">
                        <h3
                            className='JobDetails-left-title'>  Jobs based on your Profile</h3>
                        {jobReducer.jobsData.map(e => (<li className="list-group-item"><img
                            className='image-search'
                            src={require('../../images/amazon_logo.png')}
                            alt="search_image" />
                            <Link className='search-user-name' to={`/jobs/${e._id}`} onClick={clickJobDetails} >{e.company} </Link>
                            <a className='search-user-name' href='#'>{e.jobname}</a>
                        </li>))}

                    </div>
                    {/* Right : Selected Job details  */}

                    <JobDetailRight jobtitle={state.jobtitle} jobdescription={state.jobdescription} company={state.company} />
                </div>
            </div>
        </>)
}

const mapStateToProps = (state) => ({
    jobReducer: state.jobReducer
});


export default connect(mapStateToProps)(JobDetails)





