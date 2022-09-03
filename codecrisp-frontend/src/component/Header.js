import React, { useState, useEffect } from 'react'
import './Header.css';
import { FaBars, FaRegBell, FaRegComments, FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { logOutUser } from '../Action/AuthAction';
import { Link } from 'react-router-dom';
import { searchResult } from '../Action/SearchAction'
import SearchResultBox from './SearchResultComponent/SearchResultBox';
import isEmpty from '../utility/is-empty';
import { getNotificationFromDB, getNotificationFromSocket } from '../Action/NotificationAction';
import PropTypes from 'prop-types';

function Header({ 
    logOutUser, 
    auth: { user }, 
    search, 
    searchResult, 
    notif: {notification} ,
    socketReducer: { socket },
    getNotificationFromSocket,
    getNotificationFromDB}) {

    const [state, setState] = useState({ searchtext: "" })

    let ignore = false;
    
    useEffect(()=>{
        getNotificationFromDB(user.id)
    },[])

    useEffect(()=>{
        if( !isEmpty(socket) && !ignore){
            socket.on('get_post_like_notification',(data)=>{
                getNotificationFromSocket(data)
            })
        }

        return ()=>{
            ignore = true
        }
        
    },[socket])
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

    const clearSearchBar = () =>{
        setState({
            ...state,
            searchtext:''
        })
    }

    return (
        <div>
            <div className='container-fluid'>
                <nav className="navbar navbar-home navbar-expand-lg">
                    {/* Left Portion of Navbar */}
                    <div className='nav-left'>
                        <Link to='/'> <img className='logo-image' src={require('../images/logo.png')} />
                        </Link>
                        <Link to='/' className="navbar-brand"
                        >CodeCrisp
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className='search'>
                        <form className="form-inline my-2  searchBar">
                            <input className="mr-2 searchBar-input" type="text" autoComplete="off" placeholder="Search Developer" aria-label="Search" name="searchtext" value={state.searchtext} onChange={onSearch} />
                            <FaSearch color='seagreen' className="search-icon my-2 my-sm-0" title='search' onClick={onSearchClick} />
                        </form>
                    </div>

                    <div className='bell-icon-container-div'>
                        <FaRegBell color='white' className='bell-icon' title='notifications' />
                       {notification.length?<span className='notification-counter'>{notification.length}</span>:''}
                    </div>

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
                                    <a className="nav-link" href="#">Hi! {user.name}<span className="sr-only">(current)</span></a>
                                </li>) : ""
                                }
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Feeds<span className="sr-only">(current)</span></a>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/jobs">Jobs</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/discuss">Discuss</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/friends">Friends</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={`/userProfile/${user.id}`}>Profile</Link>
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
            <SearchResultBox clearSearchBar={clearSearchBar}/>
        </div >
    )

}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    notif: PropTypes.object.isRequired,
    socketReducer: PropTypes.object.isRequired,
    logOutUser: PropTypes.func.isRequired,
    searchResult: PropTypes.func.isRequired,
    getNotificationFromSocket: PropTypes.func.isRequired,
    getNotificationFromDB: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    search: state.searchRed,
    notif: state.notificationReducer,
    socketReducer: state.socketReducer
})

export default connect(mapStateToProps, { logOutUser, searchResult, getNotificationFromSocket, getNotificationFromDB })(Header)