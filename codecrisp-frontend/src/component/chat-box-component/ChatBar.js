import React from 'react';
import { Link } from 'react-router-dom';
import './Chat.css'
import { useNavigate } from 'react-router-dom';
import { width } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatBar = ({friends}) => {

    const navigate = useNavigate();
    
   const handleBack = () =>{
     navigate('/')
   }
   const handleUserClick = (id) =>{
       navigate(`/chat/${id}`)
   }

  return ( 

    <div className="chat__sidebar">
 <ArrowBackIcon 
 style={{
    marginLeft:"20px",
    background:"transparent",
    color:"white",
    fontSize:"30px"
 }}
  onClick={e => handleBack()}
 />

    <h2
    className='chat-bar-header'
    >Chat with <br/>
    friends...
    </h2>


         <div>
            <div className="chat-users">
    
              {friends.map(e => (
              
              <div
              className='chat-tile'
              >
          
              <img src={e.avatar
              ?e.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRODZob7ROpqlx8WXwjueNwTOlC6Qum-yMiyfXiFRXkdhkHgybCpdvM1UpaXCL1ycfO8NI&usqp=CAU"
              } 
              className='chat-bar-avatar'
                 />
                 
                 
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Basic_green_dot.png" 
                  style={{
                    height:"12px",
                    width:"12px",
                    color:"green",
                    position:"absolute",
                    background:"transparent",
                    marginLeft:"25px",
                    marginTop:"15px"
                    
                  }}
                 />
              
                 
                 <div
                 onClick = {event => handleUserClick(e.id)}
                 className="chat-bar-name"
                 >
                 {e.name.split(" ")[0]}</div>
                 
                 </div>    
           
              
              ))}
              
            </div>
  
        </div>

    </div>

  );

};


export default ChatBar;