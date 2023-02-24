
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import './Job.css'
import { connect } from 'react-redux';
import { getAllJobs } from '../../Action/JobAction';
import PropTypes from 'prop-types';
import Header from '../Header';
// >>>>>>> nachiketa1:codecrisp-frontend/src/component/Jobs.js

function Jobs({ jobReducer, getAllJobs }) {



    useEffect(() => {
        getAllJobs();

    }, [])


    return (
        <div>
            {/* <Header /> */}




            <div className='jobs-container-div'>
                <div
                    style={{
                        display: "flex",
                        float: "right"
                    }}
                >

                    <Link to='/jobs/add-job'>
                        <button className='btn-btn-primary'
                            style={{
                                background: "white",
                                color: "blue",
                                padding: "5px",
                                borderRadius: "0.5em",
                                cursor: "pointer"

                            }}

                        >+ Add Job</button>
                    </Link>
                </div>

                <div className='row'>
                    {jobReducer.jobsData.map((e) => (
                        <div key={e._id} className='col-sm-10 col-md-6 col-lg-4 mx-auto'>
                            <div className="card my-4">
                                <img className="card-img-top" src={require('../../images/amazon_logo.png')} alt="Card image cap" />
                                <div className="card-body card-body-job">
                                    <h5 className="card-title"
                                        style={{
                                            fontWeight: "bolder"
                                        }}
                                    >{e.jobname}</h5>
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

Jobs.propTypes = {
    jobReducer: PropTypes.object.isRequired,
    getAllJobs: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    jobReducer: state.jobReducer
});


export default connect(mapStateToProps, { getAllJobs })(Jobs)
// >>>>>>> nachiketa1:codecrisp-frontend/src/component/Jobs.js


