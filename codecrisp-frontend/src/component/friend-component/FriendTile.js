import React from 'react'
import { FaUserAlt } from 'react-icons/fa'

function FriendTile({
    avatar,
    name
}) {
    return (
            <div class="card"
                style={{ background: "white", border:'none', width:'100%' }}
            >
                {avatar ?<img class="card-img-top" src={avatar} alt="Card image cap" />
                        :<FaUserAlt size="100" className='user-profile-img-default'/>}
                <div class="card-body p-0"
                    style={{ background: "transparent" }}
                >
                    <h5 class="card-title ml-2" style={{ background: "transparent" }}>{name}</h5>
                </div>
            </div>
    )
}

export default FriendTile
