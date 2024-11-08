import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import isEmpty from '../../utility/is-empty'
import { sendMessage , reciveMessage, loadChatOfUser, resetChatMessages } from '../../Action/ChatAction';
import { getMyFriendList, setCurrentFriendFromURLForChat } from '../../Action/FriendAction';
import {useLocation} from 'react-router-dom'


const ChatPage = ({
  socketReducer:{socket} , 
  authReducer:{user} , 
  sendMessage ,
  reciveMessage , 
  chatReducer,
  getMyFriendList,
  friendReducer:{ current_friend_for_chat,friend_list,},
  loadChatOfUser,
  resetChatMessages,
  setCurrentFriendFromURLForChat,}) => {
  
  
    const location = useLocation();
    const friend_id = location.pathname.toString().split("/").at(-1);
    
    
  useEffect(()=>{
     
    getMyFriendList(user.id);
     
      if( !isEmpty(socket.emit) )
          socket.emit('add_new_user',user.id)
  },[user,socket])
    
    
   

  return (

    <div className="chat">
     <div className='chat-bar'>
  
      <ChatBar 
       friends = {friend_list}
       resetChatMessages = {resetChatMessages}
      />
      
      </div>  
      
      <div className="chat-main">
      
      
    { friend_id != 'chat' ?    
    <>
    <ChatBody 
        reciveMessage = {reciveMessage} 
        allmessages = {chatReducer?.allMessages}
        loading = {chatReducer?.loading}
        moreDataAvailable = {chatReducer?.moreDataAvailable}
        socket={socket}
        loadChatOfUser = {loadChatOfUser}
        setCurrentFriendFromURLForChat = {setCurrentFriendFromURLForChat}
        current_friend = {current_friend_for_chat}
        user_id = {user.id}
        user_name = {user.name}
        user_avatar ={user.avatar}


        /> 
        <ChatFooter socket={socket} 
        user={user.id}  
        sendMessage ={sendMessage}
      />
      </>
        : <></>}
        
      
        
        
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
export default connect(mapStateToProps , {sendMessage,
                                          reciveMessage,
                                          getMyFriendList,
                                          loadChatOfUser,
                                          setCurrentFriendFromURLForChat,
                                          resetChatMessages
                                        })(ChatPage);