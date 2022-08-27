import React from 'react'
import './ChatTile.css';

function ChatTile() {
    return (
        <>
            {[1, 2, 3, 4, 5].map(e => (<div className="chat-tile-outer">

                <div className="chat-tile-left mb-2"
                >
                    <img
                        className="chat-tile-thumbnail"
                        src={require('../../assets/images/ayush.jpg')} alt="..." />
                </div>
                <div className="chat-tile-right">

                    <div className='chat-tile-right-upper'>
                        <h5 className="chat-tile-username">Ayush Kumar</h5>
                        <h6 className="chat-tile-username">4:30 PM</h6>
                    </div>
                    <div className='chat-tile-right-lower'>
                        <p className="chat-tile-lm">Hello</p>
                        <p className="chat-tile-lm">*</p>
                    </div>

                </div>

            </div>
            ))}

        </>
    )
}

export default ChatTile