import React from 'react'
import './ChatTile.css';

function ChatTile(props) {
    return (
        <>
          <div className="chat-tile-outer">

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
                        <p className="chat-tile-lm">Hello</p>
                        <p className="chat-tile-lm">*</p>
                    </div>

                </div>

            </div>
        

        </>
    )
}

export default ChatTile