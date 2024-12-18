import React,{ useEffect} from 'react'
import FriendTile from './FriendTile'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getMyFriendList } from '../../Action/FriendAction';
import { useNavigate } from 'react-router-dom';

const FriendDetailsComponent = ({ 
    auth: {user},
    friendReducer: {friend_list},
    getMyFriendList
}) =>{

    const navigate = useNavigate();

    useEffect(()=>{
        getMyFriendList(user.id)
    },[])
    
    //when user click on a friend-tile this function is called
    const handleFriendTileClick = (friend_id) =>{
        navigate(`/userProfile/${friend_id}`)
    }

    return (
        <>
            <div className='container'>
                <h3>FRIENDS</h3>
                <div className='row friend-tile-container' style={{ margin: 0}}>
                    {friend_list?.map(friend => (
                        <div key={friend.id} className='col-md-4 col-sm-8 col-lg-3 my-2 mx-1' 
                        style={{minWidth: '200px', background: 'white',
                        padding: '5px',
                        border: '1px solid black',
                        justifyContent:'center',
                        minHeight:'280px'
                        }}>
                            <FriendTile avatar={friend.avatar} name={friend.name} friendId = {friend.id} onFriendClick={handleFriendTileClick}/>
                        </div>))}
                </div>

            </div>
        </>
    )
}

FriendDetailsComponent.propTypes = {
    friendReducer: PropTypes.object.isRequired,
    getMyFriendList: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    friendReducer: state.friendReducer,
    auth: state.authRed
})

export default connect( mapStateToProps, { getMyFriendList })(FriendDetailsComponent);