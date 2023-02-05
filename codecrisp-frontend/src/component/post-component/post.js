import React, { useState } from "react";
import "./post.css";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { timeSince } from "../../utility/dateFormat";
const PostComponent = ({
  username,
  location,
  avatar,
  postText,
  imageURL,
  id,
  handleDeletePost,
  handleClickLike,
  handlePostComment,
  comments,
  isLikedByUser,
}) => {
  const [state, setState] = useState({
    like: isLikedByUser,
    comment: "",
    n: 2,
  });
  
  console.log(comments);
  
  const commentReset = (e) =>{
     setState({...state , comment:""});
  }

  const onLike = (e)   =>{
    setState({...state , like : !state.like });
  }
  const onComment = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const seeMore = (e) => {
    setState({ ...state, n: comments.length });
  };

  return (
    <div className="my-card container" style={{ backgroundColor: "white" }}>
      <div
        className="user-details post-common"
        style={{ backgroundColor: "white" }}
      >
        <div className="user-dp-info">
          <img
            className="dp-img"
            src={
              avatar ? avatar : require("../../assets/images/nach_profile.jpg")
            }
            alt="Profile Picture"
          />
          <div className="user-info">
            <p className="user-name">
              {username ? username : "Here goes user name"}
            </p>
            <p className="user-location">
              {location ? location : "Here goes user location"}
            </p>
          </div>
        </div>
        <BsThreeDotsVertical
          onClick={(event) => handleDeletePost(event, id)}
          color="black"
          className="post-menu-img"
          title="post menu"
        />
      </div>
      <div
        className="post-body post-common"
        style={{ backgroundColor: "white" }}
      >
        <div className="main-post">
          <img
            className="post-img"
            src={
              imageURL
                ? imageURL
                : require("../../assets/images/nach_profile.jpg")
            }
            alt="post"
          />
        </div>
        <div className="post-actions">
          
          {/* Like  */}
          {state.like ? (
            <FaHeart
              onClick={(evnt) => {handleClickLike(id); onLike()} } 
              className="icon"
              style={{ color: "red", stroke: "red" }}
              color="white"
              title="like"
            />
          ) : (
            <FaHeart
              onClick={(evnt) => {handleClickLike(id); onLike()}}
              className="icon"
              color="white"
              title="like"
            />
          )}

          <FaRegComment
            className="icon comment-img"
            color="white"
            title="comment"
          />
          <FaShare className="icon share-img" color="white" title="share" />
        </div>
        <div className="who-liked-post" style={{ backgroundColor: "white" }}>
          {/* <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              margin: "0",
              background: "transparent",
              margin: "2px 10px 8px 0",
            }}
          >
            {" "}
            someone liked your post
          </p> */}
        </div>
      </div>
      <div className="username-caption" style={{ backgroundColor: "white" }}>
        <p style={{ color: "grey", fontSize: "15px", margin: "0" }}>
          <span
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "15px",
              margin: "0 10px 0 0",
              background: "white",
              display: "inline",
            }}
          >
            {username ? username : "Nachu121"}
          </span>
          {postText ? postText : "This is my caption for the post"}
        </p>
      </div>

      {/* map */}

      {comments?.slice(0, state.n).map((e) => (
        <div className="comment-box">
          <div className="comment-box-tile">
            
            
            
            <div 
            className="avatar-comment-div"
            >
            <img className="avatar-comment" src={e.avatar} />
            </div>
            
            
            <div className="comment-box-tile-details">
            
              <p className="comment-text-user">
                {e.name}
                {"            "}
              </p>
              
              
              
              <p className="comment-text">{e.text}</p>
            
            </div>
            
            
            
          </div>
        </div>
      ))}

      <div
        className="post-comments post-common"
        style={{ backgroundColor: "white" }}
      >
        {/* Comment Section */}
       { comments.length > state.n ? <button
          style={{
            color: "black",
            fontSize: "14px",
            margin: "0",
            background: "transparent",
            border:"1px solid #889397",
            padding:"5px",
            borderRadius:"0.5em",
            cursor:"pointer"
          }}
          className="secondary"
          onClick={seeMore}
        >
          see all comments ({comments?.length-state.n})
        </button> : <></>
}
        <div className="comment-wrapper" style={{ backgroundColor: "white" }}>
          {/* <img className="icon" alt="" src=''
                        style={{ backgroundColor: "white", color: "black" }}
                    /> */}

          <input
            type="text"
            className="comment-box"
            placeholder="Add a comment"
            value={state.comment}
            name="comment"
            onChange={onComment}
            style={{ backgroundColor: "rgb(245,245,245)", height: "40px" , width:"280px" }}
          />

          <button
            className="comment-btn"
            style={{
              backgroundColor: "blue",
              borderRadius: "0.5em",
              height: "30px",
              height:"38px"
            }}
            onClick={(e) => {handlePostComment(id, state.comment);commentReset()}}
          >
            post
          </button>
        </div>
        
       
        
       
      </div>
    </div>
  );
};

export default PostComponent;
