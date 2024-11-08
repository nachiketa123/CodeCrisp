import React from 'react';
import { FaUserAlt,FaUpload } from 'react-icons/fa';
import isEmpty from '../../utility/is-empty';
import { MdModeEditOutline } from 'react-icons/md';

const UserProfileSummaryComponent = ( 
    {imgUrl, 
        name, 
        email, 
        phoneNo, 
        isCurrentUser, 
        isProfileSet,
        loadingForProfilePictureChange,
        profileImgUrl,
        handleSaveProfilePic,
        handleCancelProfilePic,
        inputFile,
        handleProfilePictureChange ,
        isFriendWithUser,
        handleAddFriend,
        handleUnFriend,
        handleAcceptFriendRequest,
        handleCancelFriendRequest,
        handleRejectFriendRequest,
    }) => {
    
    const currentUserHTML = (
        <>
        {loadingForProfilePictureChange
            ?(<div style={{ height: '-webkit-fill-available', borderRadius: '1em' }}>
                <FaUpload className='profile-pic-change-loading-icon' color='white' size={50}/> 
              </div>)
            
            : profileImgUrl 
                ?(<div className='user-profile-img-preview-div'>
                    <img className='user-profile-img' src={profileImgUrl} alt="User Profile preview" />
                    <button onClick={handleSaveProfilePic} className='onpreview-save-btn btn btn-primary'>Save</button>
                    <button onClick={handleCancelProfilePic} className='onpreview-cancel-btn btn btn-danger'>Cancel</button>
                </div>)
                : (!isEmpty(imgUrl))   
                    ? (<img className='user-profile-img' src={imgUrl} alt="User Profile Pic" />) 
                    : (<FaUserAlt size="100" className='user-profile-img-default'/>)
            }
        </>
    )

    //If Not current user html
    const friendUser = (<>
        {
         !isEmpty(imgUrl)
            ? (<img className='user-profile-img' src={imgUrl} alt="User Profile Pic" />) 
            : (<FaUserAlt size="100" className='user-profile-img-default'/>)
        }
        </>
        )
    return ( 
                <div className="user-profile-div">
                    {/* if current user then show profile of current user */}
                    {isCurrentUser && currentUserHTML}
                    {/* if not current user then show profile of friend user */}
                    {!isCurrentUser && friendUser}


                    {isCurrentUser?
                        (<React.Fragment>
                            
                            <label htmlFor='edit-img-input'>
                            <MdModeEditOutline size="25" className='change-profile-picture-icon'  title='change profile picture'/>
                            </label>
                            <input name="inputFile" onChange={handleProfilePictureChange} type='file' id='edit-img-input'  value={inputFile} style={{display:'none'}}  />
                        
                        </React.Fragment>)
                    :''}

                    <div className='basic-info-div'>
                        <h5 style={{color:'blue'}}>{name}</h5>
                        <ul>
                            <li className='basic-info'>Email : {email}</li>
                            <li className='basic-info'>Phone no : {phoneNo}</li>
                            {/*<li className='basic-info'>Age : {user.age}</li> */}
                        </ul>
                    </div>
                    
                    {isCurrentUser && !isProfileSet?
                    <div className="profile-not-found-div">
                        <p style={{ fontSize: '20px',color: '#ff4747',fontWeight: '600'}} >
                            You have not yet set your profile,<br/>
                                <button style={{margin: '0 15px 0 0', borderRadius:'1em'}}
                                    className="btn btn-primary"> Click me 
                                </button>
                            and tell others about yourself. Make your mark !! :{')'}
                        </p>
                    </div>
                    :''}

                    {!isCurrentUser?
                    <div className="add-cancel-friend-btn-div">
                        {
                        (isFriendWithUser === -1) 
                            ?<button onClick={handleAddFriend} className="btn btn-primary">
                                Add Friend
                            </button>
                            :(isFriendWithUser === 0) 
                                ?<button onClick={handleCancelFriendRequest} className="btn btn-danger">
                                Cancel Request
                                </button>
                                :(isFriendWithUser === 1)
                                    ?<button onClick={handleUnFriend} className="btn btn-danger">
                                        Unfriend
                                    </button>
                                    :(<div style={{background:'transparent'}}>
                                        <button onClick={handleAcceptFriendRequest} className="btn btn-success">
                                            Accept Request
                                        </button>
                                        <button style={{marginLeft:'15px'}} onClick={handleRejectFriendRequest} className="btn btn-danger">
                                            Reject Request
                                        </button>
                                    </div>)
                        }
                    </div>
                    :''}
                
                
                </div>
     );
}
 
export default UserProfileSummaryComponent;