import React, { useState, useEffect } from 'react'
import './Header.css';
import { FaBars, FaRegBell, FaRegComments, FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { logOutUser } from '../Action/AuthAction';
import { Link } from 'react-router-dom';
import { searchResult } from '../Action/SearchAction'
import SearchResultBox from './SearchResultComponent/SearchResultBox';
import isEmpty from '../utility/is-empty';
import { getNotificationFromDB, 
        getNotificationFromSocket, 
        removeNotificationFromSocket, 
        getNotificationFromDBAndPush, 
        getCountOfUnseenNotification, 
        resetNotificationData } from '../Action/NotificationAction';
import { addCommentRealTimeOnNotification } from '../Action/PostAction';
import PropTypes from 'prop-types';
import ListGroupComponent from './common/ListGroupComponent';
import NOTIFICATION from '../Notification_Config/notification-config';
import { acceptFriendRequest, rejectFriendRequest, checkIfFriendWithUser } from '../Action/FriendAction';
import { styled } from "@mui/material/styles";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from 'react-router-dom';
import ModalBackgroundComponent from './common/modal-background-component/ModalBackgroundComponent';
function Header({
    logOutUser,
    auth: { user },
    search,
    searchResult,
    notif: { notification, moreNotificationAvailable, page, loading, number_of_unseen_notif },
    friendReducer: {isFriendWithUser},
    socketReducer: { socket },
    getNotificationFromSocket,
    getNotificationFromDB,
    getNotificationFromDBAndPush,
    removeNotificationFromSocket,
    addCommentRealTimeOnNotification,
    acceptFriendRequest,
    rejectFriendRequest,
    getCountOfUnseenNotification,
    resetNotificationData,
    checkIfFriendWithUser
 }) {

    const [state, setState] = useState({ searchtext: "", showNotification: false })

    //Adding new user socket to the server
    useEffect(()=>{
        if( !isEmpty(socket.emit) )
            socket.emit('add_new_user',user.id)
    },[user,socket])

    useEffect(() => {
        getCountOfUnseenNotification(user.id)
    }, [])

    let ignore = false;
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
                const user_data = {
                    user_id:user.id,
                    friend_id: data.notification[0].source.user
                }
                checkIfFriendWithUser(user_data)
            })

            //on friend request cancel notification
            socket.on(NOTIFICATION.EVENT_ON.GET_FRIEND_REQUEST_CANCEL_NOTIFICATION,()=>{
                getNotificationFromDB(user.id)
            })

            //on friend request reject notification
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
        getCountOfUnseenNotification(user.id)
        if(!state.showNotification){
            resetNotificationData()
        }
    }
    const navigate = useNavigate();
    const handleChat = () =>{
       navigate('/chat');
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

                    <div className='header-icons'>
                    
                    <div onClick={handleToggleNotification} className='bell-icon-container-div'>
                        <FaRegBell color='white' className='bell-icon' title='notifications' />
                        { number_of_unseen_notif? <span className='notification-counter'>{number_of_unseen_notif}</span> : ''}
                    </div>
                    
                 <ForumIcon 
                 style={{
                    background:"transparent",
                    color:"white",
                    marginLeft:"5px",
                    fontSize:"30px",
                    cursor:"pointer"
                 }}
                 onClick={handleChat}
                 />

                
                    
                    
                    
                           {(user.name) ? (<div className="nav-item">
                                    <a className="nav-link nav-link-user" href="#">Hi! 
                                    
                                    {/* {String(user.name).charAt(0).toUpperCase()+String(user.name).slice(1)} */}
                                    <span> </span> {user.name.split(" ")[0]}
                                    <span className="sr-only">(current)</span></a>
                                </div>) : ""
                                }
                             
              
</div>
                        <Container >
                            <div className="nav-item">
                                    <Link className="nav-link" to="/jobs">Jobs</Link>
                                </div>

                                <div className="nav-item">
                                    <Link className="nav-link" to="/discuss">Discuss</Link>
                                </div>
                                
                                <div className="nav-item">
                                    <Link className="nav-link" to="/friends">Friends</Link>
                                </div>
                                
                                
                                <div className="nav-item">
                                    <Link className="nav-link" to={`/userProfile/${user.id}`}>Profile</Link>
                                </div>
                                
                                
                                <div className="nav-item">
                                    <Link className="nav-link" to="/settings">Settings</Link>
                                </div>

                             
                                <div className="nav-item">
                                    <button onClick={logMeOut} type="button" className="logout" >
                                   <PowerSettingsNewIcon className='logout-btn' color='black'/> 
                                    </button>
                               </div>
                        </Container>
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
                        user={user.id}
                        dataLoader = {getNotificationFromDBAndPush}
                        moreDataAvailable = {moreNotificationAvailable}
                        pageNo = {page}
                        loading = {loading}
                        isFriendWithUser = {isFriendWithUser}
                        />
                </div>)
                : ''}

                {state.showNotification && (<ModalBackgroundComponent/>)}
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
    getNotificationFromDBAndPush: PropTypes.func.isRequired,
    getCountOfUnseenNotification: PropTypes.func.isRequired,
    resetNotificationData: PropTypes.func.isRequired,
    checkIfFriendWithUser: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    search: state.searchRed,
    notif: state.notificationReducer,
    socketReducer: state.socketReducer,
    postRed: state.postReducer,
    friendReducer: state.friendReducer
})


const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    marginLeft:"auto",
    background:"#AD42FF",
    
    [theme.breakpoints.down("1199")]: {
      backgroundColor: "white",
      bottom: "0",
      position: "fixed",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      width: "100%",
      height:"60px",
      justifyContent:"space-around"
    },
  }));

export default connect(mapStateToProps, { 
                                        logOutUser, 
                                        searchResult, 
                                        getNotificationFromSocket, 
                                        getNotificationFromDB, 
                                        getNotificationFromDBAndPush,
                                        removeNotificationFromSocket, 
                                        addCommentRealTimeOnNotification, 
                                        acceptFriendRequest,
                                        rejectFriendRequest,
                                        getCountOfUnseenNotification,
                                        resetNotificationData,
                                        checkIfFriendWithUser
                                    })(Header)