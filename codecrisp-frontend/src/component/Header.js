import React from 'react'
import './Header.css';
import { FaBars } from 'react-icons/fa';

function Header() {
    return (
        <div>
                <div className='container-fluid'>
                    <nav className="navbar navbar-expand-lg">
                        {/* Left Portion of Navbar */}
                        <div className='nav-left'>
                            <img className='logo-image' src={require('../images/logo.png')} />
                            <a className="navbar-brand" href="#"
                                style={{ fontSize: "30px", marginLeft: "15px" }}
                            >CodeCrisp</a>
                        </div>

                         {/* Search Bar */}
                        <div className='search'>
                            <form className="form-inline my-2  searchBar">
                                <input className="mr-2 searchBar-input" type="search" placeholder="Search Developer" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>

                          {/* Toggle Area */}
                          <button className='navbar-toggler' type="button" data-toggle="collapse" 
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                            
                            <FaBars color='white'></FaBars>

                        </button>

                        {/* Navigation Link  */}
                        <div className="collapse navbar-collapse  nav-right" id="navbarSupportedContent">

                            <div className='navLinks'>
                                <ul className="navbar-nav">
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

                                    <li className="nav-item">
                                        <button type="button" className="btn btn-primary">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </nav >
                </div>        

        </div >
    )



}

export default Header