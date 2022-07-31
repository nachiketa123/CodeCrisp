import React, { Component } from 'react';
import './post.css';
import heart  from '../../assets/fontawesome/svgs/regular/heart.svg';
import comment  from '../../assets/fontawesome/svgs/regular/comment.svg';
import share  from '../../assets/fontawesome/svgs/solid/share.svg';

// import heart  from '../../assets/fontawesome/svgs/regular/heart.svg';
class PostComponent extends Component {
    state = {  } 
    render() { 
        return (
            <div className='card container'>
                <div className='user-details post-common'>
                    <div className='user-dp-info'> 
                        <img className='dp-img' src={require('../../assets/images/nach_profile.jpg')} alt="Profile Picture" />
                        <div className='user-info'>
                            <p style={{fontWeight:'bold',fontSize:'16px',margin:'0'}}>Here goes user name</p>
                            <p style={{color:'grey',fontSize:'12px',margin:'0'}}>Here goes user location</p>
                        </div>
                    </div>
                    <img className='post-menu-img' src={require('../../assets/icons/post_menu.png')} alt="post menu" />
                </div>
                <div className='post-body post-common'>
                    <div className='main-post'>
                        <img className='post-img' src={require('../../assets/images/nach_profile.jpg')} alt="post" />
                    </div>
                    <div className='post-actions'>
                        <img className='like-img' src={heart} alt="like" />
                        <img className='comment-img' src={comment} alt="comment" />
                        <img className='share-img' src={share} alt="share" />
                    </div>
                    <div className='who-liked-post'>
                        <p style={{color:'#ffc107',fontWeight:'bold',fontSize:'12px',margin:'0',background:'transparent',margin:'2px 10px 8px 0'}}> someone liked your post</p>
                    </div>
                </div>
                <div className='username-caption'>
                    
                    <p style={{color:'grey',fontSize:'12px',margin:'0'}}>
                        <h3 style={{color:'white',fontWeight:'bold',fontSize:'12px',margin:'0 10px 0 0',display:'inline'}}>Nachu121</h3>
                        This is my caption for the post
                     </p>
                </div>  
                <div className='post-comments post-common'>
                    <button style={{color:'white',fontSize:'12px',margin:'0'}} className="secondary">see all comments (11)</button>
                    <div class="comment-wrapper">
                        <img src="img/smile.PNG" class="icon" alt=""/>
                        <input type="text" class="comment-box" placeholder="Add a comment"/>
                        <button class="comment-btn">post</button>
                    </div>
                </div>
            </div>
        );
    }
}
 

export default PostComponent;
