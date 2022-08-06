import React from 'react'
import Header from '../Header'
import './HomePage.css'

function HomePage() {
    return (
        <div className='background-homepage'>
            {/* Header */}
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#"
                    style={{ fontSize: "30px", marginLeft: "15px" }}
                >CodeCrisp</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup"
                    style={{ background: "transparent" }}
                >
                    <div class="navbar-nav"
                    >
                        <a class="nav-item nav-link nav-options" href="#">About Us<span class="sr-only">(current)</span></a>
                        <a class="nav-item nav-link" href="#">Features</a>
                        <a class="nav-item nav-link" href="#">Developer</a>
                        <a class="nav-item nav-link" href="#">ContactUs</a>
                    </div>

                </div>
                <button type="button" class="btn btn-primary">Login</button>
                <button type="button" class="btn btn-primary mx-2">SignUp</button>
            </nav>

            {/* Login */}

            <div className='back-down'>
                <div className='login-box-outer'>

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

                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>

                        </form>
                    </div>
                </div>
            </div>
            {/* FOOTER */}
            <div className='footer'>
                CodeCrisp @Copyright 2022
            </div>

        </div>
    )
}

export default HomePage