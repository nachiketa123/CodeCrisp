import React from 'react';
import PostComponent from './post';
import { connect } from 'react-redux';
import  PropTypes from 'prop-types';
import isEmpty from '../../utility/is-empty';
import {compareDateDesc} from '../../utility/custom-sort';
import { FaUpload } from 'react-icons/fa';
import './all-posts.css';

const AllPosts = ({postReducer: {allUserPosts,loading}}) => {
    return (
        (loading? <div className='loading-icon'><FaUpload className='upload-icon-img' color='white' size={400}> </FaUpload></div> :(
            
            <div className='all-posts'>
            {!isEmpty(allUserPosts)? 
                allUserPosts.sort(compareDateDesc).map(post=>(
                    <PostComponent username={post.name} location={post.location} avatar={post.avatar} 
                                    postText={post.postText} imageURL={post.imageUrls?post.imageUrls[0]:undefined}/>

                ))
                
                :''}
        </div>
        ))
        


    );
}

AllPosts.propTypes = {
    postReducer: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
    postReducer: state.postReducer
})

export default connect(mapStateToProps)(AllPosts);