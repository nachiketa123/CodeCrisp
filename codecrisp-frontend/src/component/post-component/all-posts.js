import React, { useCallback, useEffect, useRef, useState } from "react";
import PostComponent from "./post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../utility/is-empty";
import { compareDateDesc } from "../../utility/custom-sort";
import { FaUpload } from "react-icons/fa";
import "./all-posts.css";
import NOTIFICATION from "../../Notification_Config/notification-config";
import {
  getAllUserPosts,
  deletePost,
  addComment,
  addLike,
  editCommentById,
  deleteCommentFromPost,
} from "../../Action/PostAction";
import InfiniteScrollableComponent from "../common/infinite-scrollable-component/InfiniteScrollableComponent";

const AllPosts = ({
  postReducer: { allUserPosts, loading, morePostAvailable, page },
  auth: { user },
  getAllUserPosts,
  deletePost,
  socketReducer: { socket },
  addComment,
  editCommentById,
  addLike,
  deleteCommentFromPost,
}) => {
 
  // const observer = useRef()
  // const lastPostRef = useCallback(node=>{
  //   if(loading) return
  //   if(observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries=>{
  //     if(entries[0].isIntersecting){
        
  //     }
  //   })
  //   if(node) observer.current.observe(node)
  // },[loading,morePostAvailable])

  // let ignore = false
  // useEffect(()=>{
  //   if(!ignore)
  //     getAllUserPosts({user_id:user.id,page})
    
  //   return ()=>{
  //     ignore = true
  //   }
  // },[])

  const getPostData = (id) => {
    return new Promise((resolve) => {
      resolve(allUserPosts.find((post) => post._id === id));
      return;
    });
  };
  const handleClickLike = async (id) => {
    const post_data = await getPostData(id);
    // console.log('handleClickLike',post_data)
    if (!isEmpty(post_data)) {
      // console.log('looks like post_data is not empty')

      const event_data = {
        ...post_data,
        type: NOTIFICATION.EVENT_EMIT.POST_LIKE,
        user_who_did: user.id,
        name: user.name,
        avatar: user.avatar ? user.avatar : "",
      };

      socket.emit(NOTIFICATION.EVENT_EMIT.POST_LIKE, event_data);

      // Like Function --> DB

      addLike({ user_id: user.id, post_id: id });
    }
  };

  const handleDeletePost = (event, id) => {
    deletePost(id);
  };

  const handlePostComment = async (id, comment) => {

    // For Saving to DB
    const commentData = {
      id,
      data: { 
        user: user.id,
        name: user.name,
        text: comment,
        avatar: user.avatar,
        date: new Date().toISOString()
      },
    };
    addComment(commentData);

     // For notification
     const post_data = await getPostData(id);
     const event_data = {
      user:post_data.user,
      avatar:post_data.avatar?post_data.avatar:"",
      _id:post_data._id,
      imageUrls: post_data.imageUrls,
      type: NOTIFICATION.EVENT_EMIT.POST_COMMENT,
      user_who_did: user.id,
      name: user.name,
      avatar: user.avatar ? user.avatar : "",
      new_comment: comment
     }

     socket.emit(NOTIFICATION.EVENT_EMIT.POST_COMMENT,event_data);
  };

  const handleConfirmCommentEdit = (postId, commentId, newComment) =>{
    const data = {
      postId,
      commentId,
      newComment
    }
    
    editCommentById(data)
  }

  const handleDeleteComment = (postId,commentId) =>{

    const confirm = window.confirm('This will permanently delete the comment, are you sure?')
    if(confirm){
      const data = {
        postId,
        commentId
      }
      deleteCommentFromPost(data)
    }
    
  }

  return (
    
    <React.Fragment>
      <div className="all-posts-small">
        {<InfiniteScrollableComponent
              scrollOfComponent = "post_page_scroll"
              dataArray = {allUserPosts.sort(compareDateDesc)}
              dataLoader = {getAllUserPosts}
              identifier = {{user_id:user.id}}
              moreDataAvailable = {morePostAvailable}
              loading = {loading}
              pageNo = {page}
              uniqueId = '_id'
              renderChild = {post=>
                <PostComponent
                key={post._id}
                user_id={user.id}
                id={post._id}
                username={post.name}
                location={post.location}
                avatar={post.avatar}
                postText={post.postText}
                imageURL={post.imageUrls ? post.imageUrls[0] : undefined}
                handleDeletePost={handleDeletePost}
                handleClickLike={handleClickLike}
                handlePostComment={handlePostComment}
                handleConfirmCommentEdit = {handleConfirmCommentEdit}
                handleDeleteComment = {handleDeleteComment}
                comments={post.comments}
                isLikedByUser={post.isLikedByUser}
                noOfLikes = {post?.likes?.length}
              />
              }
            />
          }
      </div>
      {loading ? (
        <div className="loading-icon">
          <FaUpload className="upload-icon-img" color="white" size={100}>
            {" "}
          </FaUpload>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
    // </InfiniteScrollableComponent>
  );
};

AllPosts.propTypes = {
  postReducer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllUserPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  editCommentById: PropTypes.func.isRequired,
  deleteCommentFromPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  postReducer: state.postReducer,
  auth: state.authRed,
  socketReducer: state.socketReducer,
});

export default connect(mapStateToProps, {
  getAllUserPosts,
  deletePost,
  addComment,
  editCommentById,
  addLike,
  deleteCommentFromPost,
})(AllPosts);
