import React from 'react'
import './CodeCrisp.css';


function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">


                {/* Left Portion of Navbar */}
                <div className='nav-left'>
                    <img className='logo-image' src={require('../images/logo.png')} />
                    <a class="navbar-brand" href="#"
                        style={{ fontSize: "30px", marginLeft: "15px" }}
                    >CodeCrisp</a>
                </div>


                {/* Toggle Area */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse  nav-right" id="navbarSupportedContent">

                    {/* Search Bar */}

                    <form className="form-inline my-2  searchBar">
                        <input className="mr-2 searchBar-input" type="search" placeholder="Search Developer" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>


                    {/* Navigation Link  */}
                    <div className='navLinks'>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Feeds<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Jobs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Discuss</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Friends</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Settings</a>
                            </li>

                            <button type="button" class="btn btn-primary">Logout</button>
                        </ul>
                    </div>


                </div>


            </nav >


        </div >
    )



}

export default Header