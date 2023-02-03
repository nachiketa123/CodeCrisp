import React from 'react'
import ChatTile from './ChatTile'
import './ChatBox.css';

function ChatBox() {
    return (
            <div className="container-chatbox">
                <h3 className='chatbox-title'>
                     Messages
                </h3>
                <div className="input-group mb-3 search-message">
                    <input type="text" className="form-control search-input-message" 
                    placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </div>
                <ChatTile />
            </div>
    )
}

export default ChatBox

