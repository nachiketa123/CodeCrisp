import React, { useEffect } from 'react';
import PostComponent from './post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../utility/is-empty';
import { compareDateDesc } from '../../utility/custom-sort';
import { FaUpload } from 'react-icons/fa';
import './all-posts.css';
import { getAllUserPosts, deletePost, addComment } from '../../Action/PostAction';

const AllPosts = ({
    postReducer: { allUserPosts, loading },
    auth: { user },
    getAllUserPosts,
    deletePost,
    socketReducer: { socket }, addComment }) => {

    let ignore = false
    //when component renders load all the users post
    useEffect(() => {
        if (!ignore)
            getAllUserPosts(user.id)

        return () => {
            ignore = true
        }
    }, [])

    const getPostData = (id) => {
        return new Promise((resolve) => {
            resolve(allUserPosts.find(post => post._id === id))
            return;
        })
    }
    const handleClickLike = async (id) => {
        const post_data = await getPostData(id);
        // console.log('handleClickLike',post_data)
        if (!isEmpty(post_data)) {
            // console.log('looks like post_data is not empty')
            const event_data = {
                ...post_data,
                type: 'post_like',
                user_who_liked: user.id,
                name: user.name,
                avatar: user.avatar ? user.avatar : ''
            }
            socket.emit('post_like', event_data)
        }

    }

    const handleDeletePost = (event, id) => {
        console.log('deleting ', id)
        deletePost(id)

    }

    const handlePostComment = (id, comment) => {
        const commentData = { id, data: { user: user.id, name: user.name, text: comment, avatar: user.avatar } }
        console.log('post Comment ', commentData)
        addComment(commentData)

    }

    return (
        (loading ? <div className='loading-icon'><FaUpload className='upload-icon-img' color='white' size={200}> </FaUpload></div> : (

            <div className='all-posts'>
                {!isEmpty(allUserPosts) ?
                    allUserPosts.sort(compareDateDesc).map(post => (
                        <PostComponent key={post._id}
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
                        />

                    ))

                    : ''}
            </div>
        ))



    );
}

AllPosts.propTypes = {
    postReducer: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getAllUserPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    postReducer: state.postReducer,
    auth: state.authRed,
    socketReducer: state.socketReducer
})

export default connect(mapStateToProps, { getAllUserPosts, deletePost, addComment })(AllPosts);