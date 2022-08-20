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

function HomeUser(props) {
    const [state, setState] = useState({
        user: {}
    })

    return (
        <div className='app-container'>
            <div className='header'>
                <Header />
            </div>
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
    auth: state.authRed
})

export default connect(mapStateToProps)(HomeUser)
