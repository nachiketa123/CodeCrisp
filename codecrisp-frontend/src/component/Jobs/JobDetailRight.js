import React from 'react'
import '../Jobs/Job.css'
function JobDetailRight({ jobdescription, jobtitle, company }) {
    return (

        <div className="JobDetails-right">
            <h3
                className='JobDetails-left-title'>{jobtitle}</h3>
            <h3
                className='JobDetails-left-title'>{company}</h3>
            <div className='list-job-points'>

                <h6>Full-time · Mid-Senior level</h6>
                <h6>10,001+ employees · IT Services and IT Consulting</h6>
                <h6>2,796 company alumni · 4 school alumni</h6>
                <h6>See how you compare to 73 apph6cants. Try Premium for free</h6>
                <h6>Actively recruiting</h6>

            </div>
            <div className='job-description'>
                <h2>Job Description:</h2>
                <p> {jobdescription}
                </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", background: "transparent" }}>
                <button className='btn btn-primary'>Apply Now</button>
            </div>
        </div>

    )
}

export default JobDetailRight
