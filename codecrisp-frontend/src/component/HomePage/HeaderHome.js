import React from 'react'
import './HomePage.css'
import { Link } from "react-router-dom";


function HeaderHome() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg">

                <a className="navbar-brand" href="#"
                    style={{ fontSize: "30px", marginLeft: "5px" }}
                >CodeCrisp</a>


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span>
                </button>



                <div className="collapse navbar-collapse
                " id="navbarNavAltMarkup" style={{ background: "transparent" }}>


                    <div className="navbar-nav">
                        <a className="nav-item nav-link nav-options" href="#">About Us<span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="#">Features</a>
                        <Link to='/developers'>
                            <a className="nav-item nav-link" href="#">Developer</a>
                        </Link>
                        <a className="nav-item nav-link" href="#">ContactUs</a>
                    </div>

                </div>

                <Link to='/login'>
                    <button type="button" className="btn btn-primary">Login</button>
                </Link>

                <Link to='/signup'>
                    <button type="button" className="btn btn-primary mx-2">SignUp</button>
                </Link>


            </nav >

        </div >
    )
}

export default HeaderHome