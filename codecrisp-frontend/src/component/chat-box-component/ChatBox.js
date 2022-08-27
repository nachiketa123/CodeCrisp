import React from 'react'
import ChatTile from './ChatTile'
import './ChatBox.css';

function ChatBox() {
    return (
        <div>
            <div className="container-chatBox">
                <h3
                    style={{ color: "black", background: "transparent" }}
                > Messages</h3>
                <div class="input-group mb-3 search-message">
                    <input type="text" class="form-control search-input-message" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </div>
                <ChatTile />


            </div>
        </div >
    )
}

export default ChatBox

