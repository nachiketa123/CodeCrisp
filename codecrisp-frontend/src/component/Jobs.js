import React,{ useEffect} from 'react'
import './Job.css'
import { connect } from 'react-redux';
import { getAllJobs } from '../Action/JobAction';
import PropTypes from 'prop-types';

function Jobs({ jobReducer, getAllJobs }) {

    useEffect(() => {
        getAllJobs();
    }, [])


    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {jobReducer.jobsData.map((e) => (
                        <div key = {e._id} className='col-sm-10 col-md-6 col-lg-4 mx-auto'>
                            <div className="card my-4">
                                <img className="card-img-top" src={require('../images/amazon_logo.png')} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{e.jobname}</h5>
                                    <p className="card-text">{e.jobdesc}</p>
                                    <p className="card-text">Company: {e.company}</p>
                                    <p className="card-text">Location: {e.joblocation}</p>
                                    <p className="card-text">Start Date: {e.startdate}</p>
                                    <p className="card-text">End Date: {e.enddate}</p>
                                </div>

                                <div className="card-body">
                                    <a href="#" className="card-link">See More</a>
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

Jobs.propTypes = {
    jobReducer: PropTypes.object.isRequired,
    getAllJobs: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    jobReducer: state.jobReducer
});

export default connect(mapStateToProps, {getAllJobs})(Jobs)

