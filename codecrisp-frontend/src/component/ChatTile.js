import React from 'react'
import './CodeCrisp.css';

function ChatTile() {
    return (
        <>
            <div className="card mb-1 chat-tile">
                <div className="row no-gutters chat-tile-outer">
                    <div className="col-md-4"
                    >
                        <img
                            className="chat-tile-thumbnail"
                            src={require('../images/luv_profile.jpg')} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title chat-tile-username">Luv Saini</h5>
                            {/* <p className="card-text chat-tile-lm">"Last Messages"</p> */}
                            <p className="card-text chat-tile-lm">"Last Messages"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-1 chat-tile">
                <div className="row no-gutters chat-tile-outer">
                    <div className="col-md-4"
                    >
                        <img
                            className="chat-tile-thumbnail"
                            src={require('../images/nach_profile.jpg')} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title chat-tile-username">Nachiketa</h5>
                            {/* <p className="card-text chat-tile-lm">"Last Messages"</p> */}
                            <p className="card-text chat-tile-lm">"last seen message"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-1 chat-tile">
                <div className="row no-gutters chat-tile-outer">
                    <div className="col-md-4"
                    >
                        <img
                            className="chat-tile-thumbnail"
                            src={require('../images/ayush.jpg')} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title chat-tile-username">Ayush</h5>
                            {/* <p className="card-text chat-tile-lm">"Last Messages"</p> */}
                            <p className="card-text chat-tile-lm">"last seen message"</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ChatTile