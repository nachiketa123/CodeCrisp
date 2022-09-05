import React from 'react'
import FriendTile from './FriendTile'

const FriendDetailsComponent = () =>{
   

    return (
        <>
            <div className='container'>
                <h3>FRIENDS</h3>
                <div className='row justify-content-center'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
                        <div className='col-md-4 col-sm-8 col-lg-3 my-2 mx-0' style={{minWidth: '205px'}}>
                            <FriendTile />
                        </div>))}
                </div>

            </div>
        </>
    )
}

export default FriendDetailsComponent;