import React, {useEffect} from 'react';
import PostComponent from './post';
import { connect } from 'react-redux';
import  PropTypes from 'prop-types';
import isEmpty from '../../utility/is-empty';
import {compareDateDesc} from '../../utility/custom-sort';
import { FaUpload } from 'react-icons/fa';
import './all-posts.css';
import { getAllUserPosts } from '../../Action/PostAction';

const AllPosts = ({postReducer: {allUserPosts,loading}, auth: { user }, getAllUserPosts }) => {

    //when component renders load all the users post
    useEffect(()=>{
        getAllUserPosts(user.id)
    },[])
    return (
        (loading? <div className='loading-icon'><FaUpload className='upload-icon-img' color='white' size={400}> </FaUpload></div> :(
            
            <div className='all-posts'>
            {!isEmpty(allUserPosts)? 
                allUserPosts.sort(compareDateDesc).map(post=>(
                    <PostComponent key={post._id} username={post.name} location={post.location} avatar={post.avatar} 
                                    postText={post.postText} imageURL={post.imageUrls?post.imageUrls[0]:undefined}/>

                ))
                
                :''}
        </div>
        ))
        


    );
}

AllPosts.propTypes = {
    postReducer: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getAllUserPosts: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    postReducer: state.postReducer,
    auth: state.authRed
})

export default connect(mapStateToProps, { getAllUserPosts })(AllPosts);