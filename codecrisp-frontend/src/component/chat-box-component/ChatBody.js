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
   
    <div>
 
    <div className="message__container">
  <ReactScrollableFeed>
    { allmessages.map((e,i) => (
    <div key={i} className="message__chats">

     { e.recived ? <></>:<>
      <p className="sender__name">{user_name}</p>

      <div className="message__sender">
        <p>{e.text}</p>
      </div>
      </>}
    
        { e.recived ?
        <>
        <p
         style={{marg:"0px"}}
         >{current_friend.name}</p>

         <div className="message__recipient">
           <p
           style={{margin:"0px"}}
           >{e.text}</p>
         </div>
         </>:<></>
         }
    </div> 
          )) 
    }
    </ReactScrollableFeed>
 </div>
        {/*This shows messages received by you*/}

        {/* <div className="message__chats"> */}

     

        {/* </div> */}
    

        {/*This is triggered when a user is typing*/}

        <div className="message__status">

          <p>Someone is typing...</p>

        </div>

 

    </div>

  );

};


export default ChatBody;