import React from 'react'

function FriendTile() {
    return (
        <div>
            <div class="card"
                style={{ background: "white" }}
            >
                <img class="card-img-top" src={require('../../assets/images/ayush.jpg')} alt="Card image cap" />
                <div class="card-body p-0"
                    style={{ background: "transparent" }}
                >
                    <h5 class="card-title ml-2" style={{ background: "transparent" }}>Ayush Kumar</h5>
                </div>
            </div>
        </div>
    )
}

export default FriendTile
