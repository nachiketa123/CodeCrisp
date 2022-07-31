import React from 'react'
import ChatTile from './ChatTile'
import './ChatBox.css';

function ChatBox() {
    return (
        <div>
            <div className="container-chatBox">
                <ChatTile />

                {/* Search Bar for Friend Searching ...... */}
                <div class="input-group mb-3"
                    style={{ position: "fixed", bottom: "10px", width: "18%", margin: "auto" }}
                >
                    <input type="text" class="form-control" placeholder="Search Developer" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button" id="button-addon2"
                            style={{ fontWeight: "bolder", color: "white" }}
                        >Search</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatBox

