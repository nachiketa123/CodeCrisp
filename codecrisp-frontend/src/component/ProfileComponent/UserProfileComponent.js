import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SendFriendRequest } from '../../Action/FriendAction';
import extractUserIdFromURL from '../../utility/UrlidExtract';
import './UserProfileComponent.css'
import { MdModeEditOutline } from 'react-icons/md';
import { FaUserAlt,FaUpload } from 'react-icons/fa';
import { changeMyProfilePicture } from '../../Action/ProfileAction';
import isEmpty from '../../utility/is-empty';

const UserProfileComponent = ( { auth:{ user }, SendFriendRequest, changeMyProfilePicture } ) => {

    const [state, setState] = useState({
        profile_user_id:'',
        add_friend_btn_state:true,
        profileImgFile:'',
        profileImgUrl:''
    })


    useEffect(()=>{
        

        //TODO:  call action to get this user and render the profile component 
        extractUserIdFromURL()
        .then(res=>{
            let profile_user_id = res;
            setState({
                ...state,
                profile_user_id: profile_user_id
            })
        })
        
    },[])


    //when state of profileImgFile changes, i.e. user tried to change the profile picture
    let ignore2 = false
    useEffect(()=>{
        if(!ignore2){
            try{
                const reader = new FileReader()
                reader.onloadend = ()=>{
                    setState({
                        ...state,
                        profileImgUrl: reader.result
                    })
                }
                reader.readAsDataURL(state.profileImgFile)
            }catch(err){
                console.log('error in img upload',err)
            }
            
        }

        return ()=>{
            ignore2 = true
        }
    },[state.profileImgFile])
    
    const toggleAddFriendButtonState = ()=>{
        setState({
            ...state,
            add_friend_btn_state: !state.add_friend_btn_state
        })
    }

    const handleProfilePictureChange = (e)=>{
        setState({
            ...state,
            profileImgFile:e.target.files[0]
        })
    }

    const handleAddFriend = async (e)=>{
        if( state.add_friend_btn_state === true){
            const payload ={
                sender_user_id: user.id,
                recipient_user_id: await extractUserIdFromURL()
            }
            SendFriendRequest(payload);
        }
        else{
            //TODO: cancel friend request
        }
        toggleAddFriendButtonState();
        
    }

    const handleSaveProfilePic = () =>{
        setState({
            ...state,
            profileImgUrl:'',
            profileImgFile:''
        })
        const user_data = {
            user_id : user.id,
            base64ImgURI : state.profileImgUrl
        }
        changeMyProfilePicture(user_data)
        
    }

    const handleCancelProfilePic = ()=>{
        setState({
            ...state,
            profileImgUrl:'',
            profileImgFile:''
        })
    }

    return ( 
        <div className='profile-component-container'>
            <div className='profile-summary-container'>
                <div className="user-profile-div">

                    {user.loadingForProfilePictureChange
                    ?<div><FaUpload className='profile-pic-change-loading-icon' color='white' size={50}> </FaUpload></div>
                    
                    : state.profileImgUrl ? 
                        (<div className='user-profile-img-preview-div'>
                            <img className='user-profile-img' src={state.profileImgUrl} alt="User Profile preview" />
                            <button onClick={handleSaveProfilePic} className='onpreview-save-btn btn btn-primary'>Save</button>
                            <button onClick={handleCancelProfilePic} className='onpreview-cancel-btn btn btn-danger'>Cancel</button>
                         </div>)
                    : (!isEmpty(user) && !isEmpty(user.avatar)) ? <img className='user-profile-img' src={user.avatar} alt="User Profile Pic" /> 
                    
                    : <FaUserAlt size="100" className='user-profile-img-default'/>
                    }
                    
                    
                    <label htmlFor='edit-img-input'>
                        <MdModeEditOutline size="25" className='change-profile-picture-icon'  title='change profile picture'/>
                    </label>
                    <input name="inputFile" onChange={handleProfilePictureChange} type='file' id='edit-img-input'  value={state.inputFile} style={{display:'none'}}  />
                    
                </div>
                <div className='basic-info-div'>
                    <h5 style={{color:'blue'}}>{''}UserName</h5>
                    <ul>
                        <li className='basic-info'>Email : myEmail</li>
                        <li className='basic-info'>Phone no : myPhoneNo</li>
                        <li className='basic-info'>Age : myAge</li>
                    </ul>
                </div>
                
            </div>
        </div>
        
     );
}
UserProfileComponent.propTypes = {
    SendFriendRequest : PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired,
    changeMyProfilePicture: PropTypes.func.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.authRed
})
 
export default connect(mapStateToProps, { SendFriendRequest,changeMyProfilePicture })(UserProfileComponent);