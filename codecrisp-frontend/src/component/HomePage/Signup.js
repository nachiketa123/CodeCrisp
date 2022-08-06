import React from 'react'

function Signup() {
    return (
        <div className='container'>
            <div className='back-down row justify-content-md-center'>
                <div className='login-box-outer  col col-sm-12 col-md-8 col-lg-6'>

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


                            <button type="submit" className="btn btn-primary">SignUp</button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup