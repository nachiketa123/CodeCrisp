import React, { useEffect } from 'react'
import '../Jobs/Job.css'
import { getAllJobs } from '../../Action/JobAction';
import { connect } from 'react-redux';
import Header from '../Header';
function JobDetails({ jobReducer }) {

    useEffect(() => {
        getAllJobs();

    }, [])
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
                            <a className='search-user-name' href='#'>{e.company}   | </a>
                            <a className='search-user-name' href='#'>{e.jobname}</a>
                        </li>))}

                    </div>
                    {/* Right : Selected Job details  */}
                    <div className="JobDetails-right">
                        <h3
                            className='JobDetails-left-title'>Java Full Stack Developer</h3>
                        <h3
                            className='JobDetails-left-title'>Amazon </h3>
                        <div className='list-job-points'>

                            <h6>Full-time · Mid-Senior level</h6>
                            <h6>10,001+ employees · IT Services and IT Consulting</h6>
                            <h6>2,796 company alumni · 4 school alumni</h6>
                            <h6>See how you compare to 73 apph6cants. Try Premium for free</h6>
                            <h6>Actively recruiting</h6>

                        </div>
                        <div className='job-description'>
                            <h2>Job Description:</h2>
                            <p>We are in lookout of a Java Fullstack Developer. This is a    great opportunity to get into the space.
                                Cheers..!!!
                                The Key responsibilities include:3+ years with experience in developing, scripting, testing, and troubleshooting applications developed in the following languages: Java, spring boot, microservices and UI scripting React.Js/Node.JS
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", background: "transparent" }}>
                            <button className='btn btn-primary'>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

const mapStateToProps = (state) => ({
    jobReducer: state.jobReducer
});


export default connect(mapStateToProps, getAllJobs)(JobDetails)





