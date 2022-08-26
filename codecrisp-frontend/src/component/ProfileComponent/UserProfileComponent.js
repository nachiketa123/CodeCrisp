import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SendFriendRequest } from '../../Action/FriendAction';


const UserProfileComponent = ( { auth:{ user }, SendFriendRequest } ) => {

    const [state, setState] = useState({
        profile_user_id:'',
        add_friend_btn_state:true
    })


    useEffect(()=>{
        

        //TODO:  call action to get this user and render the profile component 
        let profile_user_id = extractUserIdFromURL();
        setState({
            ...state,
            profile_user_id: profile_user_id
        })
    },[])
    
    const toggleAddFriendButtonState = ()=>{
        setState({
            ...state,
            add_friend_btn_state: !state.add_friend_btn_state
        })
    }

    const handleAddFriend = (e)=>{
        if( state.add_friend_btn_state === true){
            const payload ={
                sender_user_id: user.id,
                recipient_user_id: extractUserIdFromURL()
            }
            SendFriendRequest(payload);
        }
        else{
            //TODO: cancel friend request
        }
        toggleAddFriendButtonState();
        
    }

    const extractUserIdFromURL =()=>{

        const current_url = window.location.href;
        let profile_user_id = current_url.match(/(?:.(?!\/))+$/).toString().substring(1,current_url.length);
        return profile_user_id;
    }

    return ( 
        <div>
            <div>
                <h1 style={{color:'white'}}>Profile component</h1>
            </div>
            <div>
                <button onClick={handleAddFriend} className='btn btn-primary'> {(state.add_friend_btn_state)?'Add Friend':'Cancel Request'}</button>
            </div>
        </div>
        
     );
}
UserProfileComponent.propTypes = {
    SendFriendRequest : PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
    auth: state.authRed
})
 
export default connect(mapStateToProps, { SendFriendRequest })(UserProfileComponent);