import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SendFriendRequest } from '../../Action/FriendAction';
import extractUserIdFromURL from '../../utility/UrlidExtract';
import './UserProfileComponent.css'
import { MdModeEditOutline } from 'react-icons/md';
import { FaUserAlt,FaUpload } from 'react-icons/fa';
import { changeMyProfilePicture, setProfilePictureLoadingOff, getProfileForUser } from '../../Action/ProfileAction';
import isEmpty from '../../utility/is-empty';
import { useLocation } from 'react-router-dom';
import UserProfileSummaryComponent from './UserProfileSummaryComponent';

const UserProfileComponent = ( { auth:{ user,loadingForProfilePictureChange },
                                profileReducer:{ user_profile, profile_page_loading }, 
                                SendFriendRequest, 
                                changeMyProfilePicture, 
                                setProfilePictureLoadingOff, 
                                getProfileForUser
                                 } 
                            ) => {

    const [state, setState] = useState({
        profile_user_id:'',
        add_friend_btn_state:true,
        profileImgFile:'',
        profileImgUrl:'',
    })

    const location = useLocation();

    useEffect(()=>{
        
        extractUserIdFromURL()
        .then(res=>{
            let profile_user_id = res;
            // console.log('useEffect current url',profile_user_id)
            getProfileForUser(profile_user_id)
            setState({
                ...state,
                profile_user_id: profile_user_id
            })
        })
        
    },[location])

    
    //when state of profileImgFile changes, i.e. user tried to change the profile picture
    let ignore2 = false
    useEffect(()=>{
        // console.log('ignore2: ',ignore2)
        
        // console.log(!isEmpty(state.profileImgFile))

        // if(typeof state.profileImgFile === "object"){
        //     console.log('state.profileImgFile ',state.profileImgFile.name)
        //     console.log('length: ',Object.keys(state.profileImgFile.name))
        // }
        if(!ignore2 && !isEmpty(state.profileImgFile.name)){
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

    //for showing loading while user changes new profile picture
    let ignore3 = false
    useEffect(()=>{
        if(!ignore3)
            setProfilePictureLoadingOff();

        return ()=>{
            ignore3 = true
        }
    },[user.avatar])
    
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
            profileImgFile:'',
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

    const renderProfile = () =>{
        return (
                    <UserProfileSummaryComponent  
                        imgUrl={user_profile.avatar} 
                        name={user_profile.name} 
                        email={user_profile.email} 
                        phoneNo = {user_profile.phoneNo}
                        inputFile= {state.inputFile}
                        loadingForProfilePictureChange={loadingForProfilePictureChange}
                        profileImgUrl={state.profileImgUrl}
                        isCurrentUser={state.profile_user_id === user.id}
                        handleSaveProfilePic = {state.profile_user_id === user.id ? handleSaveProfilePic : '' }
                        handleCancelProfilePic = {state.profile_user_id === user.id ? handleCancelProfilePic : '' }
                        handleProfilePictureChange = {state.profile_user_id === user.id ? handleProfilePictureChange : '' }
                        isProfileSet={!isEmpty(user_profile)}
                    />
                )
    }

    const renderNoProfileFound = () =>{
        return (
                <UserProfileSummaryComponent
                    imgUrl = {state.profile_user_id === user.id ? user.avatar : user_profile.avatar} 
                    name = {state.profile_user_id === user.id ? user.name : user_profile.name} 
                    email = {state.profile_user_id === user.id ? user.email : user_profile.email} 
                    phoneNo = {state.profile_user_id === user.id ? user.phoneNo : user_profile.phoneNo}
                    inputFile = {state.inputFile}
                    loadingForProfilePictureChange = {loadingForProfilePictureChange}
                    profileImgUrl = {state.profileImgUrl}
                    isCurrentUser = {state.profile_user_id === user.id}
                    handleSaveProfilePic = {state.profile_user_id === user.id ? handleSaveProfilePic : '' }
                    handleCancelProfilePic = {state.profile_user_id === user.id ? handleCancelProfilePic : '' }
                    handleProfilePictureChange = {state.profile_user_id === user.id ? handleProfilePictureChange : '' }
                    isProfileSet = {!isEmpty(user_profile)}
                />
                
            )
    }

    return ( 
        <div className='profile-component-container'>
            <div className="profile-summary-container">
                { profile_page_loading  ? <div style={{display:'flex',justifyContent:'center'}}>
                                            <FaUpload className='profile-page-loading-icon' color='white' size={250}> 
                                            </FaUpload>
                                        </div>
                                    :user_profile ?  renderProfile() :  renderNoProfileFound()}
            </div>
            
        </div>
        
     );
}
UserProfileComponent.propTypes = {
    SendFriendRequest : PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired,
    changeMyProfilePicture: PropTypes.func.isRequired,
    setProfilePictureLoadingOff: PropTypes.func.isRequired,
    getProfileForUser: PropTypes.func.isRequired,
    // errorReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.authRed,
    profileReducer: state.profileReducer,
    // errorReducer: state.errorReducer,
})
 
export default connect(mapStateToProps, { SendFriendRequest,
                                        changeMyProfilePicture,
                                        setProfilePictureLoadingOff, 
                                        getProfileForUser })(UserProfileComponent);