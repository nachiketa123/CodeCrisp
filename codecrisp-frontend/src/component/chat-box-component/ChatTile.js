import React from 'react';
import './ChatTile.css';
import { useNavigate } from 'react-router';
import isEmpty from '../../utility/is-empty';

function ChatTile(props) {
    const navigate = useNavigate()

    const handleClick = (id) =>{
        navigate(`/chat/${id}`)
    }

    return (
        <>
          <div onClick={evnt=>handleClick(props.id)} className="chat-tile-outer">

                <div className="chat-tile-left mb-2"
                >
                    <img
                        className="chat-tile-thumbnail"
                        src={props.avatar? props.avatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRODZob7ROpqlx8WXwjueNwTOlC6Qum-yMiyfXiFRXkdhkHgybCpdvM1UpaXCL1ycfO8NI&usqp=CAU"
                        } alt="..." />
                </div>
                <div className="chat-tile-right">

                    <div className='chat-tile-right-upper'>
                        <h5 className="chat-tile-username">{props.name}</h5>
                        <h6 className="chat-tile-username">4:30 PM</h6>
                    </div>
                    <div className='chat-tile-right-lower'>
                        <p className="chat-tile-lm">{ isEmpty(props.lastMessage.error) ? props.lastMessage.substring(0,20)+"..." : props.lastMessage.error}</p>
                        <p className="chat-tile-lm">*</p>
                    </div>

                </div>

            </div>
        

        </>
    )
}

export default ChatTile