import React from 'react'
import Header from './Header'
import './Job.css'

function Jobs() {
    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
                        <div className='col-sm-10 col-md-6 col-lg-4 mx-auto'>
                            <div class="card my-4">
                                <img class="card-img-top" src={require('../images/amazon_logo.png')} alt="Card image cap" />
                                <div class="card-body">
                                    <h5 class="card-title">Amazon SDE 1</h5>
                                    <p class="card-text">Job Description: Need to work as full time Java Developer...</p>
                                </div>

                                <div class="card-body">
                                    <a href="#" class="card-link">See More</a>
                                    <a href="#" class="card-link">Apply Now</a>
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
