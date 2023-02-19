import React, { useEffect, useState } from 'react';
import { sendMessage } from '../../Action/ChatAction';
import { useLocation } from "react-router-dom";
import './Chat.css'

const ChatFooter = ({socket , user ,sendMessage}) => {
   
  const location = useLocation();
  const pathname = location.pathname.toString().split("/").at(-1);

  const [message, setMessage] = useState('');


  const handleSendMessage = (e) => {
  
      e.preventDefault();
  
      // if (message.length != 0) {
      //   socket.emit('message', {
      //     text: message,
      //     to:pathname,
      //     from:user
          
      //   });
      // }
      
      const obj = {
        user_id: user,
        text:message,
        friend_id: pathname,
      }
      if(message.length !=0)
        sendMessage(obj);
      
       setMessage('');
  
    };
 

  return (

    <div className="chat__footer">

      <form className="form"
      onSubmit={(e) => handleSendMessage(e)}
      >

        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}

        />

        <button className="sendBtn"
        onClick={handleSendMessage}
        >SEND</button>

      </form>

    </div>

  );

};


export default ChatFooter;