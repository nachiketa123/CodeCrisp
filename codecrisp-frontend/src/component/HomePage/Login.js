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

                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login