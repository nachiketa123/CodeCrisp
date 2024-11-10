import React, { useState } from 'react';
import './Chat.css'
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect} from 'react';
import isEmpty from '../../utility/is-empty'
import ReactScrollableFeed from 'react-scrollable-feed'
import NOTIFICATION from '../../Notification_Config/notification-config';
import InfiniteScrollableComponent from '../common/infinite-scrollable-component/InfiniteScrollableComponent';
import ReverseInfiniteScrollableComponent from '../common/infinite-scrollable-component/ReverseInfiniteScrollableComponent';

const ChatBody = ({
  reciveMessage , 
  allmessages ,
  loading,
  moreDataAvailable,
  socket,
  loadChatOfUser,
  setCurrentFriendFromURLForChat,
  user_id,
  user_name,
  user_avatar,
  current_friend,
}) => {

  const location = useLocation()
  const [friend_id,setFriend_id] = useState('');
  let ignore = false
  let ignore1 = false
  useEffect(()=>{
    if(!ignore){
      setFriend_id(location.pathname.toString().split("/").at(-1));
    }
    return ()=>{
      ignore = true
    }
  },[location])
   
  useEffect(() => {
    if(!isEmpty(socket)){
        socket.on(NOTIFICATION.EVENT_ON.GET_NEW_MESSAGE_REQUEST_NOTIFICATION, handleRecieveMessage)
    }
    // Cleanup to remove the event listener on unmount or socket change
    return () => {
      if(!isEmpty(socket))
        socket.off(NOTIFICATION.EVENT_ON.GET_NEW_MESSAGE_REQUEST_NOTIFICATION, handleRecieveMessage);
    };
  },[socket])

  useEffect(()=>{
    if(!ignore && !isEmpty(friend_id)){
      setCurrentFriendFromURLForChat(friend_id)
    }
    return ()=>{
      ignore1 = true
    }
  },[friend_id])

  const handleRecieveMessage = (data) => {
    reciveMessage(data);
  }

  return (
   
    <div>
 
    <div className="message__container">
  {/* <ReactScrollableFeed>
    { allmessages.messages.map((e,i) => (
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
    </ReactScrollableFeed> */}

{/* Implementing infinite scrolling */}
{/* <ReactScrollableFeed> */}
    {!isEmpty(friend_id) && <ReverseInfiniteScrollableComponent
      scrollOfComponent={"user_chat_scroll"}
     dataArray={allmessages.messages}
     dataLoader={loadChatOfUser}
     identifier={{user_id,friend_id}}
     key={allmessages.messages._id}
     pageNo={allmessages.page}
     moreDataAvailable={moreDataAvailable}
     reverseScroll={true}
     loading={loading}
     renderChild={e=> (
            <div className="message__chats">

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
          )}
          />}
        
    {/* </ReactScrollableFeed> */}
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