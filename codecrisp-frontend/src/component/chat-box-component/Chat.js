import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import isEmpty from '../../utility/is-empty'
import { sendMessage , reciveMessage } from '../../Action/ChatAction';
import { getMyFriendList } from '../../Action/FriendAction';

const ChatPage = ({socketReducer:{socket} , authReducer:{user} , sendMessage ,reciveMessage , chatReducer
,getMyFriendList,friendReducer}) => {
  
  
  useEffect(()=>{
     
    getMyFriendList(user.id);
     
      if( !isEmpty(socket.emit) )
          socket.emit('add_new_user',user.id)
  },[user,socket])
    
    
   

  return (

    <div className="chat">
     <div className='chat-bar'>
  
      <ChatBar 
       friends = {friendReducer.friend_list}
      />
      
      </div>  
      
      <div className="chat-main">
      
      
        <ChatBody 
        reciveMessage = {reciveMessage} 
        allmessages = {chatReducer?.allMessages}
        socket={socket}
        />
        
        <ChatFooter socket={socket} 
          user={user.id}  
          sendMessage ={sendMessage}
        />
        
        
      </div>
    </div>

  );

};

const mapStateToProps = (state) =>({
     socketReducer : state.socketReducer,
     authReducer:state.authRed,
     chatReducer:state.chatreducer,
     friendReducer : state.friendReducer
})
export default connect(mapStateToProps , {sendMessage,reciveMessage,getMyFriendList})(ChatPage);