import React, { useState } from 'react';
import './post.css';
import { FaHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";

const PostComponent = ({ username, location, avatar, postText, imageURL }) => {

    const [state, setState] = useState({
        like: false
    })

    const handleClickLike = (e) => {
        setState({
            ...state,
            like: !state.like
        })
    }

    return (
        <div className='my-card container'
            style={{ backgroundColor: "white" }}
        >
            <div className='user-details post-common'
                style={{ backgroundColor: "white" }}
            >
                <div className='user-dp-info'>
                    <img className='dp-img' src={avatar?avatar:require('../../assets/images/nach_profile.jpg')} alt="Profile Picture" />
                    <div className='user-info'>
                        <p className='user-name'>{username ? username : 'Here goes user name'}</p>
                        <p className='user-location'>{location ? location : 'Here goes user location'}</p>
                    </div>
                </div>
                <BsThreeDotsVertical color='black' className='post-menu-img' title="post menu" />
            </div>
            <div className='post-body post-common'
                style={{ backgroundColor: "white" }}
            >
                <div className='main-post'>
                    <img className='post-img' src={imageURL ? imageURL : require('../../assets/images/nach_profile.jpg')} alt="post" />
                </div>
                <div className='post-actions'

                >


                    {
                        state.like ? (<FaHeart onClick={handleClickLike} className='icon' style={{ color: 'red', stroke: 'red' }}
                            color="white" title="like" />)
                            : (<FaHeart onClick={handleClickLike} className='icon' color="white" title="like" />)
                    }

                    <FaRegComment className='icon comment-img' color="white" title="comment" />
                    <FaShare className='icon share-img' color="white" title="share" />
                </div>
                <div className='who-liked-post'
                    style={{ backgroundColor: "white" }}
                >
                    <p style={{ color: 'black', fontWeight: 'bold', fontSize: '14px', margin: '0', background: 'transparent', margin: '2px 10px 8px 0' }}> someone liked your post</p>
                </div>
            </div>
            <div className='username-caption'
                style={{ backgroundColor: "white" }}
            >

                <p style={{ color: 'grey', fontSize: '15px', margin: '0' }}>
                    <span style={{ color: 'black', fontWeight: 'bold', fontSize: '15px', margin: '0 10px 0 0', background: "white", display: 'inline' }}>{username ? username : 'Nachu121'}</span>
                    {postText ? postText : 'This is my caption for the post'}
                </p>
            </div>
            <div className='post-comments post-common'
                style={{ backgroundColor: "white" }}
            >
                <button style={{ color: 'black', fontSize: '14px', margin: '0', background: "transparent" }} className="secondary">see all comments (11)</button>
                <div className="comment-wrapper"
                    style={{ backgroundColor: "white" }}
                >
                    <img src="img/smile.PNG" className="icon" alt=""
                        style={{ backgroundColor: "white", color: "black" }}
                    />
                    <input type="text" className="comment-box" placeholder="Add a comment"
                        style={{ backgroundColor: "rgb(245,245,245)", height: "30px" }}
                    />
                    <button className="comment-btn"
                        style={{ backgroundColor: "blue", borderRadius: "0.5em", height: "30px" }}
                    >post</button>
                </div>
            </div>
        </div>
    );
}


export default PostComponent;
