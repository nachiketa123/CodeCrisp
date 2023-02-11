import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {sendFriendRequest, sendUnFriendRequest, checkIfFriendWithUser, acceptFriendRequest } from '../../Action/FriendAction';
import extractUserIdFromURL from '../../utility/UrlidExtract';
import './UserProfileComponent.css'
import { MdModeEditOutline } from 'react-icons/md';
import { FaUserAlt,FaUpload } from 'react-icons/fa';
import { changeMyProfilePicture, setProfilePictureLoadingOff, getProfileForUser } from '../../Action/ProfileAction';
import isEmpty from '../../utility/is-empty';
import { useLocation } from 'react-router-dom';
import UserProfileSummaryComponent from './UserProfileSummaryComponent';
import NOTIFICATION from '../../Notification_Config/notification-config';
import { getNotificationFromSocket } from '../../Action/NotificationAction';

const UserProfileComponent = ( { auth:{ user,loadingForProfilePictureChange },
                                profileReducer:{ user_profile, profile_page_loading }, 
                                friendReducer: { isFriendWithUser },
                                socketReducer: {socket},
                                sendFriendRequest, 
                                changeMyProfilePicture, 
                                setProfilePictureLoadingOff, 
                                getProfileForUser,
                                sendUnFriendRequest,
                                checkIfFriendWithUser,
                                acceptFriendRequest,
                                 } 
                            ) => {

    const [state, setState] = useState({
        profile_user_id:'',
        profileImgFile:'',
        profileImgUrl:'',
    })

    const location = useLocation();


    useEffect(()=>{
        
        extractUserIdFromURL()
        .then(res=>{
            let profile_user_id = res;
            // console.log('useEffect current url',profile_user_id)
            const user_data = {
                user_id: user.id,
                friend_id: profile_user_id
            }
            checkIfFriendWithUser(user_data)
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
        
        // console.log(state.profileImgFile)

        // if(typeof state.profileImgFile === "object"){
        //     console.log('state.profileImgFile ',state.profileImgFile.name)
        //     console.log('length: ',Object.keys(state.profileImgFile.name))
        // }
        if(!ignore2){
            try{
                const reader = new FileReader()
                reader.onloadend = ()=>{
                    setState({
                        ...state,
                        profileImgUrl: reader.result
                    })
                }

                if(typeof state.profileImgFile === 'object'){
                    reader.readAsDataURL(state.profileImgFile)
                }
                    
                else{
                    setState({
                        ...state,
                        profileImgUrl: ''
                    })
                }
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

    let ignore = false
    useEffect(() => {
        if (!isEmpty(socket) && !ignore) {
            //user friend request notification
            socket.on(NOTIFICATION.EVENT_ON.GET_FRIEND_REQUEST_NOTIFICATION,(data)=>{
                console.log('I will change the button',data)
                extractUserIdFromURL()
                .then(res=>{
                    let profile_user_id = res;
                    // console.log('useEffect current url',profile_user_id)
                    const user_data = {
                        user_id: user.id,
                        friend_id: profile_user_id
                    }
                    checkIfFriendWithUser(user_data)
                })
            })
        }
        return ()=>{
            ignore = true
        }
    },[socket])

    const handleProfilePictureChange = (e)=>{
        setState({
            ...state,
            profileImgFile:e.target.files[0]
        })
    }

    const handleAddFriend = async (e)=>{
        if( isFriendWithUser !== 1 ){
            const payload ={
                sender_user_id: user.id,
                recipient_user_id: await extractUserIdFromURL()
            }

            sendFriendRequest()

            //send friend request notification event
            const { recipient_user_id } = payload
            const data = {
                user: recipient_user_id,
                source:{
                    user: user.id,
                    name: user.name,
                    avatar: user.avatar? user.avatar: ''
                },
            }
            console.log('event emitted')
            socket.emit(NOTIFICATION.EVENT_EMIT.FRIEND_REQUEST,data)
        }
        else{
            //TODO: cancel friend request
        }
        
    }

    const handleUnFriend = async (e)=>{
        if( isFriendWithUser === 1 ){
            const payload = {
                sender_user_id: user.id,
                recipient_user_id: await extractUserIdFromURL()
            }
            sendUnFriendRequest(payload);
            const user_data = {
                user_id: user.id,
                friend_id: state.profile_user_id
            }
        }
    }

    const handleAcceptFriendRequest = async () =>{
        const payload = {
            sender_user_id: user.id,        //one who got the request
            recipient_user_id: await extractUserIdFromURL() //one who sent the request
        }
        acceptFriendRequest(payload)
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
                        isFriendWithUser = {isFriendWithUser}
                        handleAddFriend = {handleAddFriend}
                        handleUnFriend = {handleUnFriend}
                        handleAcceptFriendRequest = {handleAcceptFriendRequest}
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
                    isFriendWithUser = {isFriendWithUser}
                    handleAddFriend = {handleAddFriend}
                    handleUnFriend = {handleUnFriend}
                    handleAcceptFriendRequest = {handleAcceptFriendRequest}
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
    sendFriendRequest : PropTypes.func.isRequired, 
    sendUnFriendRequest : PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired,
    changeMyProfilePicture: PropTypes.func.isRequired,
    setProfilePictureLoadingOff: PropTypes.func.isRequired,
    getProfileForUser: PropTypes.func.isRequired,
    checkIfFriendWithUser: PropTypes.func.isRequired,
    acceptFriendRequest: PropTypes.func.isRequired,
    getNotificationFromSocket: PropTypes.func.isRequired,
    // errorReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    auth: state.authRed,
    profileReducer: state.profileReducer,
    friendReducer: state.friendReducer,
    socketReducer: state.socketReducer,
    // errorReducer: state.errorReducer,
})
 
export default connect(mapStateToProps, {
                                        sendFriendRequest,
                                        acceptFriendRequest,
                                        changeMyProfilePicture,
                                        setProfilePictureLoadingOff, 
                                        getProfileForUser,
                                        sendUnFriendRequest,
                                        checkIfFriendWithUser,
                                        getNotificationFromSocket })(UserProfileComponent);