import React from 'react';
import './FriendNavigatorComponent.css';
import { FiUsers, FiUserPlus, FiUserCheck } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'

const FriendNavigatorComponent = () => {
    return ( 
        <div className='friend-navigator-container'>
            <h2 className="navigator-heading">Friends</h2>
            <div className="selector-div-container">
                <div className="selector-div">
                    <div className='selector-div-left-part'>
                        <FiUsers className='all-friends-icon'/> 
                        <label className='selector-div-text'>All Friends</label>
                    </div>
                    <IoIosArrowForward className='selector-div-right-part'/>
                </div>
                    
                    
                <div className="selector-div">
                    <div className='selector-div-left-part'>
                        <FiUserPlus className='friend-request-icon'/>
                        <label className='selector-div-text'>Friend Requests</label>
                    </div>
                    <IoIosArrowForward className='selector-div-right-part'/>
                </div>
                <div className="selector-div">
                    <div className='selector-div-left-part'>
                        <FiUserCheck className='friends-suggestion-icon'/>
                        <label className='selector-div-text'>Friend Suggestion</label>
                    </div>
                    <IoIosArrowForward className='selector-div-right-part'/>
                </div>
            
            </div> 
        </div>
    );
}
 
export default FriendNavigatorComponent;