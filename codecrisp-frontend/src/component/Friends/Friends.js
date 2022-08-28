import React from 'react'
import Header from '../Header'
import FriendTile from './FriendTile'

function Friends() {



    return (
        <>
            <Header />
            <div className='container'>
                <h3>FRIENDS</h3>
                <div className='row'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
                        <div className='col-md-3 col-sm-8 col-lg-3 my-2 mx-0'>
                            <FriendTile />
                        </div>))}
                </div>

            </div>
        </>
    )
}

export default Friends
