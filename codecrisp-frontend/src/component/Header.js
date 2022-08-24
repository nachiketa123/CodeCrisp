import React, { useState, useEffect } from 'react'
import './Header.css';
import { FaBars, FaRegBell, FaRegComments, FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { logOutUser } from '../Action/AuthAction';
import { Link } from 'react-router-dom';
import { searchResult } from '../Action/SearchAction'
import isEmpty from '../utility/is-empty';

function Header({ logOutUser, auth: { user }, search, searchResult }) {

    const [state, setState] = useState({ searchtext: "" })


    // useEffect(() => {
    //     console.log(search.user)
    // }, [search.user])

    useEffect(() => {
        const userFind = { searchText: state.searchtext }
        searchResult(userFind);

    }, [state.searchtext])

    const onSearch = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const logMeOut = (e) => {
        logOutUser();
    }

    const onSearchClick = () => {

    }

    return (
        <div>
            <div className='container-fluid'>
                <nav className="navbar navbar-home navbar-expand-lg">
                    {/* Left Portion of Navbar */}
                    <div className='nav-left'>
                        <img className='logo-image' src={require('../images/logo.png')} />
                        <Link to='/'>
                            <a className="navbar-brand" href="#"
                            >CodeCrisp</a>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className='search'>
                        <form className="form-inline my-2  searchBar">
                            <input className="mr-2 searchBar-input" type="text" autocomplete="off" placeholder="Search Developer" aria-label="Search" name="searchtext" value={state.searchtext} onChange={onSearch} />
                            <FaSearch color='seagreen' className="search-icon my-2 my-sm-0" title='search' onClick={onSearchClick} />
                        </form>
                    </div>

                    <FaRegBell color='white' className='bell-icon' title='notifications' />
                    <FaRegComments color='white' className='chat-icon' title='chat' />

                    {/* Toggle Area */}
                    <button className='navbar-toggler' type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">

                        <FaBars color='white' className='hamburger-icon'></FaBars>

                    </button>

                    {/* Navigation Link  */}
                    <div className="collapse navbar-collapse  nav-right" id="navbarSupportedContent">

                        <div className='navLinks'>
                            <ul className="navbar-nav">
                                {(user.name) ? (<li className="nav-item">
                                    <span className="nav-link" href="#">Hi! {user.name}<span className="sr-only">(current)</span></span>
                                </li>) : ""
                                }
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Feeds<span className="sr-only">(current)</span></a>
                                </li>

                                <li className="nav-item">
                                    <Link to='/jobs'>
                                        <a className="nav-link" href="#">Jobs</a>
                                    </Link>
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
                                    <button onClick={logMeOut} type="button" className="btn btn-primary">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </nav >
            </div>

        </div >
    )

}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    search: state.searchRed
})

export default connect(mapStateToProps, { logOutUser, searchResult })(Header)