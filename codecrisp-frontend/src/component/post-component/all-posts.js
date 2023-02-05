import React, { useEffect, useState } from "react";
import PostComponent from "./post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../utility/is-empty";
import { compareDateDesc } from "../../utility/custom-sort";
import { FaUpload } from "react-icons/fa";
import "./all-posts.css";
import {
  getAllUserPosts,
  deletePost,
  addComment,
  addLike,
} from "../../Action/PostAction";

const AllPosts = ({
  postReducer: { allUserPosts, loading, morePostAvailable, page },
  auth: { user },
  getAllUserPosts,
  deletePost,
  socketReducer: { socket },
  addComment,
  addLike,
}) => {
  //to load data when user hits bottom of the page
  const [state, setState] = useState({
    page: page, //initial page is 0
  });
 
  
  
  const [scrollPosition, setScrollPosition] = useState(
    Number(sessionStorage.getItem("post_page_scroll"))
  );

  let scrollEvent = null;

  let ignore = false;
  //when component renders load all the users post on particular page number(intial page 0)
  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }

    if (!ignore && (isEmpty(allUserPosts) || allUserPosts[allUserPosts.length-1].page !== state.page)) {
      getAllUserPosts({ user_id: user.id, page: state.page });
    }

    // Add the scroll event listener
    if (!scrollEvent) {
      scrollEvent = window.addEventListener("scroll", handleScroll);
    }

    return () => {
      ignore = true;
      // Remove the scroll event listener
      window.removeEventListener("scroll", scrollEvent);
      scrollEvent = null;
    };
  }, [state.page]);

  const handleScroll = () => {
    // console.log('window.innerHeight',window.innerHeight);
    // console.log('+ document.documentElement.scrollTop',document.documentElement.scrollTop);
    // console.log('document.documentElement.scrollHeight',document.documentElement.scrollHeight);

    // console.log('window.scrollY',window.scrollY)
    if (
      Math.trunc(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.scrollHeight
    ) {
      sessionStorage.setItem("post_page_scroll", window.scrollY);
      setScrollPosition(window.scrollY);
      if (morePostAvailable) {
        setState({ page: state.page + 1 });
      }
    }
  };

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
        type: "post_like",
        user_who_liked: user.id,
        name: user.name,
        avatar: user.avatar ? user.avatar : "",
      };

      socket.emit("post_like", event_data);

      // Like Function --> DB

      addLike({ user_id: user.id, post_id: id });
    }
  };

  const handleDeletePost = (event, id) => {
    console.log("deleting ", id);
    deletePost(id);
  };

  const handlePostComment = (id, comment) => {
    const commentData = {
      id,
      data: { 
        user: user.id,
        name: user.name,
        text: comment,
        avatar: user.avatar,
      },
    };
    addComment(commentData);
  };

  return (
    <React.Fragment>
      <div className="all-posts">
        {!isEmpty(allUserPosts)
          ? allUserPosts
              .sort(compareDateDesc)
              .map((post) => (
              
          
                  
          
                <PostComponent
                  key={post._id}
                  id={post._id}
                  username={post.name}
                  location={post.location}
                  avatar={post.avatar}
                  postText={post.postText}
                  imageURL={post.imageUrls ? post.imageUrls[0] : undefined}
                  handleDeletePost={handleDeletePost}
                  handleClickLike={handleClickLike}
                  handlePostComment={handlePostComment}
                  comments={post.comments}
                  isLikedByUser={post.isLikedByUser}
                />
                
                
              
              ))
          : ""}
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
  );
};

AllPosts.propTypes = {
  postReducer: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAllUserPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
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
  addLike,
})(AllPosts);
