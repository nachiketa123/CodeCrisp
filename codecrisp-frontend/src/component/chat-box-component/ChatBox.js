import React, { useEffect } from 'react'
import ChatTile from './ChatTile'
import './ChatBox.css';
import {connect} from 'react-redux';
import { getMyFriendList } from '../../Action/FriendAction';
import isEmpty from '../../utility/is-empty';

function ChatBox({authReducer , friendReducer , getMyFriendList}) {
  
  useEffect(() =>{
    if(authReducer.user){
      getMyFriendList(authReducer.user.id);
    }
  } ,[authReducer.user])


    return (
            <div className="container-chatbox">
                <h3 className='chatbox-title'>
                     Messages
                </h3>
                <div className="input-group mb-3 search-message">
                    <input type="text" className="form-control search-input-message" 
                    placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </div>
                { authReducer.user && friendReducer?.friend_list?.map(e  => (
                       <ChatTile key={e.id}
                         name = {e.name}
                         avatar = {e.avatar}
                         id = {e.id}
                         lastMessage = {e.lastMessage}
                       />
                   )
                ) 
                }
                {authReducer.user 
                && friendReducer.friend_list 
                && friendReducer.friend_list.length === 0
                && <span className='text-group-input'>No recent chats</span>}
            </div>
    )
}

const mapStateToProps = (state) =>(
  {   
      friendReducer:state.friendReducer,
      authReducer:state.authRed
  }
)

export default connect(mapStateToProps,{getMyFriendList})(ChatBox)

