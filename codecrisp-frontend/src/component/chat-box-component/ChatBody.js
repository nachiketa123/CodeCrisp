import React from 'react';
import './Chat.css'
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect} from 'react';
import isEmpty from '../../utility/is-empty'
import ReactScrollableFeed from 'react-scrollable-feed'
import NOTIFICATION from '../../Notification_Config/notification-config';

const ChatBody = ({
  reciveMessage , 
  allmessages ,
  socket,
  loadChatOfUser,
  setCurrentFriendFromURLForChat,
  user_id,
  user_name,
  user_avatar,
  current_friend,
}) => {

  const location = useLocation()

  let ignore = false
  useEffect(()=>{
    const friend_id = location.pathname.toString().split("/").at(-1);
    if(!ignore)
      loadChatOfUser({user_id,friend_id})
      setCurrentFriendFromURLForChat(friend_id)

    return ()=>{
      ignore = true
    }
  },[location])
   
  useEffect(() => {
    if(!isEmpty(socket)){
        socket.on(NOTIFICATION.EVENT_ON.GET_NEW_MESSAGE_REQUEST_NOTIFICATION, (data) =>{
          reciveMessage(data);
        })
    }
  },[socket])

  return (

    <>

      <header className="chat__mainHeader">

        <p>CODECRISP</p>

      

      </header>


      {/*This shows messages sent from you*/}
  
   
 
    <div className="message__container">
    <ReactScrollableFeed>
    { allmessages?allmessages.map( e => (
    <div className="message__chats">

      <p className="sender__name">{e.recived?current_friend.name:user_name}</p>

      <div className="message__sender">
        <p>{e.text}</p>
      </div>

    </div>
   
          )) :''
    }
    </ReactScrollableFeed>
 </div>
        {/*This shows messages received by you*/}

        {/* <div className="message__chats">

          <p>Other</p>

          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>

        </div> */}


        {/*This is triggered when a user is typing*/}

        {/* <div className="message__status">

          <p>Someone is typing...</p>

        </div> */}

 

    </>

  );

};


export default ChatBody;