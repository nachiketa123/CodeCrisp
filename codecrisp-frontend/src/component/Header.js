import React, { useState, useEffect } from 'react'
import './Header.css';
import { FaBars, FaRegBell, FaRegComments, FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { logOutUser } from '../Action/AuthAction';
import { Link } from 'react-router-dom';
import { searchResult } from '../Action/SearchAction'
import SearchResultBox from './SearchResultComponent/SearchResultBox';
import isEmpty from '../utility/is-empty';
import { getNotificationFromDB, getNotificationFromSocket, removeNotificationFromSocket } from '../Action/NotificationAction';
import { addCommentRealTimeOnNotification } from '../Action/PostAction';
import PropTypes from 'prop-types';
import ListGroupComponent from './common/ListGroupComponent';
import NOTIFICATION from '../Notification_Config/notification-config';
import { acceptFriendRequest, rejectFriendRequest } from '../Action/FriendAction';

function Header({
    logOutUser,
    auth: { user },
    search,
    searchResult,
    notif: { notification },
    socketReducer: { socket },
    getNotificationFromSocket,
    getNotificationFromDB,
    removeNotificationFromSocket,
    addCommentRealTimeOnNotification,
    acceptFriendRequest,
    rejectFriendRequest }) {

    const [state, setState] = useState({ searchtext: "", showNotification: false })

    let ignore = false;

    useEffect(()=>{
        if( !isEmpty(socket.emit) )
            socket.emit('add_new_user',user.id)
    },[user,socket])

    useEffect(() => {
        getNotificationFromDB(user.id)
    }, [])

    useEffect(() => {
        if (!isEmpty(socket) && !ignore) {
            //user post like notification
            socket.on(NOTIFICATION.EVENT_ON.GET_POST_LIKE_NOTIFICATION, (data) => {
                getNotificationFromSocket(data)
            })
            //user post unlike notification
            socket.on(NOTIFICATION.EVENT_ON.GET_POST_UNLIKE_NOTIFICATION, (data) => {
                removeNotificationFromSocket(data)
            })
            //user post comment notification
            socket.on(NOTIFICATION.EVENT_ON.GET_POST_COMMENT_NOTIFICATION,(data)=>{
                
                getNotificationFromSocket(data)

                //In order to add the comment on users post in real time
                const commentData = {
                    id: data.notification.at(0).action_item_id,
                    data: { 
                      user: data.notification.at(0).source.user,
                      name: data.notification.at(0).source.name,
                      text: data.new_comment,
                      avatar: data.notification.at(0).source.avatar,
                      date: new Date().toISOString()
                    },
                  };
                  addCommentRealTimeOnNotification(commentData)
            })

            //user friend request notification
            socket.on(NOTIFICATION.EVENT_ON.GET_FRIEND_REQUEST_NOTIFICATION,(data)=>{
                getNotificationFromSocket(data)
            })

            //on friend request cancel notification
            socket.on(NOTIFICATION.EVENT_ON.GET_FRIEND_REQUEST_CANCEL_NOTIFICATION,()=>{
                getNotificationFromDB(user.id)
            })

            //on friend request cancel notification
            socket.on(NOTIFICATION.EVENT_ON.GET_FRIEND_REQUEST_REJECT_NOTIFICATION,()=>{
                getNotificationFromDB(user.id)
            })
        }

        return () => {
            ignore = true
        }

    }, [socket])
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

    const clearSearchBar = () => {
        setState({
            ...state,
            searchtext:''
        }) 
    }
    const handleToggleNotification = () => {
        setState({
            ...state,
            showNotification: !state.showNotification
        })
    }

    return (
        <div className='user-homepage-header'>
            <div className='container-fluid'>
                <nav className="navbar navbar-home navbar-expand-lg">
                    {/* Left Portion of Navbar */}
                    <div className='nav-left logo-image-container'>
                        <Link to='/'
                        > <img className='logo-image' src={require('../images/logo.png')} 
                        style={{height:"35px" , width:"35px"}}
                        />
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

                    <div onClick={handleToggleNotification} className='bell-icon-container-div'>
                        <FaRegBell color='white' className='bell-icon' title='notifications' />
                        {notification.length ? <span className='notification-counter'>{notification.length}</span> : ''}
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
                                    <a className="nav-link" href="#">Hi! {String(user.name).charAt(0).toUpperCase()+String(user.name).slice(1)}<span className="sr-only">(current)</span></a>
                                </li>) : ""
                                }
                                {/* <li className="nav-item">
                                    <div onClick={handleToggleNotification} className='bell-icon-container-div'>
                                        <FaRegBell color='white' className='bell-icon' title='notifications' />
                                        {notification.length ? <span className='notification-counter'>{notification.length}</span> : ''}
                                    </div>
                                </li> */}

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
                                    <Link className="nav-link" to="/settings">Settings</Link>
                                </li>

                                <li className="nav-item logout">
                                    <button onClick={logMeOut} type="button" className="btn btn-primary">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </nav >
            </div>

            {/* Search result component */}
            <SearchResultBox clearSearchBar={clearSearchBar} />

            {/* Notification component */}
            {state.showNotification
                ? (<div className='notification-list-div'>
                    <ListGroupComponent  
                    acceptFriendRequest = {acceptFriendRequest}
                    rejectFriendRequest = {rejectFriendRequest}
                    items={notification} 
                    user={user.id}/>
                </div>)
                : ''}
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
    getNotificationFromDB: PropTypes.func.isRequired,
    removeNotificationFromSocket: PropTypes.func.isRequired,
    addCommentRealTimeOnNotification: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    rejectFriendRequest: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    search: state.searchRed,
    notif: state.notificationReducer,
    socketReducer: state.socketReducer,
    postRed: state.postReducer
})

export default connect(mapStateToProps, { 
                                        logOutUser, 
                                        searchResult, 
                                        getNotificationFromSocket, 
                                        getNotificationFromDB, 
                                        removeNotificationFromSocket, 
                                        addCommentRealTimeOnNotification, 
                                        acceptFriendRequest,
                                        rejectFriendRequest
                                    })(Header)