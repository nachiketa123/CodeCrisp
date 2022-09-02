import React from 'react'
import './HomeUser.css'
import ChatBox from './chat-box-component/ChatBox';
import Header from './Header';
import AllPosts from './post-component/all-posts';
import PostBox from './post-component/Post-box';
import CommunityNotification from './SideComponent';
import NotificationMobile from './NotificationMobile';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchResultBox from './SearchResultComponent/SearchResultBox'
import './SearchResultComponent/SearchResultBox.css'
import isEmpty from '../utility/is-empty';
function HomeUser({ auth: { user }, socketReducer: {socket}}) {
    const [state, setState] = useState({
        user: {}
    })


    useEffect(()=>{
        if( !isEmpty(socket.emit) )
            socket.emit('add_new_user',user.id)
    },[user,socket])

    return (
        <div className='app-container'>
            <div className='feed-body'>
                <div className='chat-box'>
                    <ChatBox />
                </div>
                <div className='all-posts'>
                    <PostBox />
                    <AllPosts />
                </div>
                <div className='notification-panel'>
                    <CommunityNotification />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    socketReducer: state.socketReducer
})

export default connect(mapStateToProps)(HomeUser)
