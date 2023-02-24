import React from 'react'
import './HomeUser.css'
import ChatBox from './chat-box-component/ChatBox';
import Header from './Header';
import AllPosts from './post-component/all-posts';
import PostBox from './post-component/Post-box';
import CommunityNotification from './SideComponent';
import NotificationMobile from './NotificationMobile';
import { useEffect, useState } from 'react';
import SearchResultBox from './SearchResultComponent/SearchResultBox'
import './SearchResultComponent/SearchResultBox.css'
import isEmpty from '../utility/is-empty';
import {global_notification} from '../Action/globalnotificationAction'
import { connect } from "react-redux";
import Chat from './chat-box-component/Chat';

function HomeUser({ auth: { user }, socketReducer: {socket},global_notification}) {

    


    const [state, setState] = useState({
        user: {}
    })

    useEffect(() =>{
        global_notification();
    })
    
    // useEffect(()=>{
    //     if( !isEmpty(socket.emit) )
    //         socket.emit('add_new_user',user.id)
    // },[user,socket])

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

export default connect(mapStateToProps,{global_notification})(HomeUser)
