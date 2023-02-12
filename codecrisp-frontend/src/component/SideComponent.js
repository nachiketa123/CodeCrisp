import React from 'react';
import './SideComponent.css'
import {connect} from 'react-redux'


const CommunityNotification = ({globalNotification}) => {

console.log(globalNotification.globalNotification)
    return (
            <div className='community-notification-container flex-item'>
                <div className='title'> CommunityNotification </div>
                <div className='notif-category CommunityNotification' >
                   {globalNotification.globalNotification[0]?.community_notification}
                </div>
                <div className='title'> Tech News</div>
                <div className='notif-category TechNews' >
                    {globalNotification.globalNotification[0]?.tech_notification}
                </div>
                <div className='title'> Quotes</div>
                <div className='notif-category Quotes' >
                   {globalNotification.globalNotification[0]?.quotes_notification}
                </div>
            </div>
        );
}

const mapSateToProps = (state) =>({
    globalNotification:  state.globalNotification
})

export default connect(mapSateToProps , {})(CommunityNotification);