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

    <h2
    style={{fontWeight:"bolder",
      color:"white",
      
    }}
    >Friends</h2>


         <div>
            <div className="chat__users">
    
              {friends.map(e => (
              
              <div
              key={e.id}
               style={{
                 
                 display:"flex",
                 alignItems:"center",
                 flexDirection:"row",
                 cursor:"pointer",
                 background:"white",
                 borderRadius:"2em"
                        
               }}
              >
          
              <img src={e.avatar
              ?e.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRODZob7ROpqlx8WXwjueNwTOlC6Qum-yMiyfXiFRXkdhkHgybCpdvM1UpaXCL1ycfO8NI&usqp=CAU"
              } 
                 style={{
                   height:"50px",
                   width:"50px",
                   borderRadius:"50%"
                 }}
                 />
                 
                 
                 <p
                 onClick = {event => handleUserClick(e.id)}
                 style={{
                 margin:"0px"
                 }}
                 >
                 {e.name}</p>
                 
                 </div>    
           
              
              ))}
            </div>
  
        </div>

    </div>

  );

};


export default ChatBar;