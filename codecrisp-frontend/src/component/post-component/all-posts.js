import React from 'react';
import PostComponent from './post';

const AllPosts = () => {
    return ( 
        <div className='all-posts'>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
        </div>
        

     );
}
 
export default AllPosts;