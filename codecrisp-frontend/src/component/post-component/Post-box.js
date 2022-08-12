import React from 'react'
import './Post-box.css'
import { FaFileImage, FaVideo, FaRegStickyNote } from "react-icons/fa";
function PostBox() {
    return (
        <div className='postBox-outer'>

            <div className='postBox-row1'>
                <div className='profile-photo'>

                    <img
                        className='user-photo'
                        src={require('../../assets/images/nach_profile.jpg')} alt="Profile Photo" />
                </div>
                <div className='postBox-textArea'>

                    <input type='text' className='postBox-text' placeholder='Share your Day !' />
                    <button type="button" className="btn btn-primary"
                        style={{ borderRadius: "0.5em" }}>Post</button>


                </div>
            </div>
            <div className='postBox-row2'>
                <a className='icons-postbox'><FaFileImage color='seagreen' className='photo' />Photo</a>
                <a className='icons-postbox'><FaVideo color='blue'
                    className='video' />Video</a>
                <a className='icons-postbox'><FaRegStickyNote color='red'
                    className='article' />Write article</a>
            </div>
        </div>

    )
}

export default PostBox
