import React from 'react'

function Signup() {
    return (
        <div>
            <div className='back-down'>
                <div className='login-box-outer'>

                    <h1>SignUp</h1>
                    <div className='login-box'>
                        <form>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Email</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" placeholder="email" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">phone no</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Phone Number" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Age</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Age" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="passwords" className="form-control" id="exampleInputPassword1" placeholder="password" />
                            </div>


                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-primary">SignUp</button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup