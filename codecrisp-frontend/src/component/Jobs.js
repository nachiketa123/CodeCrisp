import React from 'react'
import Header from './Header'
import './Job.css'

function Jobs() {
    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row'>
                    {[1, 2, 3, 4, 5, 6].map((e) => (
                        <div className='col-sm-10 col-md-6 col-lg-4 mx-auto'>
                            <div className="card my-4">
                                <img className="card-img-top" src={require('../images/amazon_logo.png')} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Amazon SDE 1</h5>
                                    <p className="card-text">Job Description: Need to work as full time Java Developer...</p>
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

export default Jobs
