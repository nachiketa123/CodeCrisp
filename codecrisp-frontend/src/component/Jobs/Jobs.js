import React, { useEffect } from 'react'
import Header from '../Header'
import '../Jobs/Job.css'
import { connect } from 'react-redux';
import { getAllJobs } from '../../Action/JobAction';
import { Link } from 'react-router-dom'

function Jobs({ jobReducer }) {



    useEffect(() => {
        getAllJobs();

    }, [])


    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row'>
                    {jobReducer.jobsData.map((e) => (
                        <div className='col-sm-10 col-md-6 col-lg-4 mx-auto'>
                            <div className="card my-4">
                                <img className="card-img-top" src={require('../../images/amazon_logo.png')} alt="Card image cap" />
                                <div className="card-body card-body-job">
                                    <h5 className="card-title">{e.jobname}</h5>
                                    <p className="card-text">{e.jobdesc}</p>
                                    <p className="card-text">Company: {e.company}</p>
                                    {/* <p className="card-text">Location: {e.joblocation}</p> */}
                                    {/* <p className="card-text">Start Date: {e.startdate.substr(0, 10)}</p>
                                    <p className="card-text">End Date: {e.enddate.substr(0, 10)}</p> */}
                                </div>

                                <div className="card-body card-body-job">
                                    <Link to={`/jobs/${e._id}`} className="card-link" >See More</Link>
                                    <a href="#" className="card-link">Apply Now</a>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    jobReducer: state.jobReducer
});


export default connect(mapStateToProps, getAllJobs)(Jobs)


