import React from 'react';
import './Chat.css'
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import isEmpty from '../../utility/is-empty'
import ReactScrollableFeed from 'react-scrollable-feed'

const ChatBody = ({reciveMessage , allmessages ,socket}) => {


   
  useEffect(() => {
    if(!isEmpty(socket)){
         socket.on('message', (data) =>{
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
    { allmessages.map( e => (
    <div className="message__chats">

      <p className="sender__name">You</p>

      <div className="message__sender">
        <p>{e}</p>
      </div>

    </div>
   
          )) 
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