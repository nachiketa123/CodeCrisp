import React from 'react'
import './HomePage.css'



function Login() {
    return (
        <div className='container'>
            <div className='back-down row justify-content-md-center' >
                <div className='login-box-outer   col col-sm-12 col-md-8 col-lg-6'>

                    <h1>Login</h1>
                    <div className='login-box'>
                        <form>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login