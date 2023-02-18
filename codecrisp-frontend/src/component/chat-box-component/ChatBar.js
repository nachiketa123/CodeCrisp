import React from 'react';
import { Link } from 'react-router-dom';
import './Chat.css'
import { useNavigate } from 'react-router-dom';


const ChatBar = ({friends}) => {

    const navigate = useNavigate();
    
 
   const handleUserClick = (id) =>{
       navigate(`/chat/${id}`)
   }

  return (

    <div className="chat__sidebar">

      <h2>Open Chat</h2>


      <div>

        <h4 className="chat__header">ACTIVE USERS</h4>

        <div className="chat__users">

          {friends.map(e => (
             <p
             onClick = {event => handleUserClick(e.id)}
             >{e.name}</p>
          ))}
        </div>

      </div>

    </div>

  );

};


export default ChatBar;