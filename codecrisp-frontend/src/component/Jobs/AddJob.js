import axios from 'axios'
import React, { useState } from 'react'

function AddJob() {


    let today = new Date().toISOString().slice(0, 10)

    const [state, setState] = useState({
        jobname: "",
        jobdesc: "",
        joblocation: "",
        company: "",
        enddate: ""


    },
    )


    const handleOnchange = (e) => {
        setState({
            ...state, [e.target.name]: e.target.value
        })

    }

    const onSubmit = (e) => {

        const jobd = {
            jobname: state.jobname,
            jobdesc: state.jobdesc,
            joblocation: state.joblocation,
            company: state.company,
            enddate: state.enddate

        }

        axios.post('/api/jobs/add-job', jobd).then(res => {
            console.log(res.data)
        })

        setState({
            jobname: "",
            jobdesc: "",
            joblocation: "",
            company: "",
            enddate: ""


        },
        )
    }

    return (
        <div>
            <br />
            <br />


            <form>
                <div className='container'>
                    <div className='back-down row justify-content-md-center'>
                        <div className='login-box-outer  col col-sm-12 col-md-8 col-lg-6'>
                            <h1>Create a Job!</h1>
                            <div className='login-box'>
                                <form>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Job Title</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Job Title"
                                            name="jobname" value={state.name} onChange={handleOnchange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Job Description</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Job Description"
                                            name="jobdesc" value={state.email} onChange={handleOnchange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Location</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Location"
                                            name="joblocation" value={state.phoneNo} onChange={handleOnchange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">End Date</label>
                                        <input type="date" className="form-control" id="exampleInputPassword1" placeholder="End Date"
                                            name="enddate" value={state.age} onChange={handleOnchange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Company</label>
                                        <input type="passwords" className="form-control" id="exampleInputPassword1" placeholder="Company"
                                            name="company" value={state.password} onChange={handleOnchange}
                                        />
                                    </div>




                                    <button type="submit" className="btn btn-primary"
                                        onClick={onSubmit}
                                    >Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

        </div >
    )
}

export default AddJob