import React from 'react';
import './SideComponent.css'
const CommunityNotification = () => {
    return (
            <div className='community-notification-container flex-item'>
                <div className='title'> CommunityNotification </div>
                <div className='notif-category CommunityNotification' >
                    APP UNDER DEVELOPMENT
                </div>
                <div className='title'> Tech News</div>
                <div className='notif-category TechNews' >
                    APP UNDER DEVELOPMENT
                </div>
                <div className='title'> Quotes</div>
                <div className='notif-category Quotes' >
                    APP UNDER DEVELOPMENT
                </div>
            </div>
        );
}

export default CommunityNotification;