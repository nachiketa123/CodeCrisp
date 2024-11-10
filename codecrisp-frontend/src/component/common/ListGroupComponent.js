import React, { useState } from 'react';
import './ListGroupComponent.css'
import getContentFromNotificationType from '../../utility/getContentFromNotificationType';
import { compareDateDesc } from '../../utility/custom-sort';
import { timeSince } from '../../utility/dateFormat';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import NOTIFICATION from '../../Notification_Config/notification-config';
import InfiniteScrollableComponent from './infinite-scrollable-component/InfiniteScrollableComponent';
import getClassNames from '../../utility/getClassNames';
import { MdOutlineTextSnippet } from "react-icons/md";
import {FaUserCircle} from "react-icons/fa";


const ListGroupComponent = ({ 
    items, 
    acceptFriendRequest,
    rejectFriendRequest, 
    user,
    dataLoader,
    moreDataAvailable,
    pageNo,
    loading,
    totalNotification,
}) => {

    const [showFriendRequestActionIcons,setShowFriendRequestActionIcons] = useState(true);
      const renderHTML = (item) => {
        const handleAcceptFriendRequest = () => {
            setShowFriendRequestActionIcons(false);
            acceptFriendRequest({
                sender_user_id: user,
                recipient_user_id: item.source.user
            })
        }
        const handleRejectFriendRequest = () => {
            setShowFriendRequestActionIcons(false);
            rejectFriendRequest({
                sender_user_id: user,
                recipient_user_id: item.source.user
            })
        }
        return (
            <div className="cs-list-group">
                <div className="cs-list-item">
                   {item.source.avatar?
                        <img className="user-avatar-notification" src={item.source.avatar} alt=""/>
                        :<FaUserCircle style={{color:"black"}} size="50"  />
                    }
                </div>
                <div className="cs-list-item">
                    <div className={getClassNames({dc:'item-user-info',cc:'item-user-info-seen'},item.seen,true)}>{item.source.name}</div>
                    <div className='item-content'>
                        <div className={getClassNames({dc:'notif-type',cc:'notif-type-seen'},item.seen,true)}>{getContentFromNotificationType(item.type)}</div>
                        <div className={getClassNames({dc:'time-since',cc:'time-since-seen'},item.seen,true)}>{timeSince(item.date)}</div>
                    </div>
                </div>
                {item.type !== NOTIFICATION.EVENT_EMIT.FRIEND_REQUEST
                    ?(<div className="cs-list-item">
                        {item.action_item_img[0]?<img className="action-item-img" src={item.action_item_img[0]} alt=""/>
                        :<MdOutlineTextSnippet className='action-item-img' title='Text post'/>}
                    </div>)
                    : showFriendRequestActionIcons?  (<div className='friend-request-action-btns-div'>
                        <AiFillCheckCircle onClick={handleAcceptFriendRequest} title='Accept' className='btns request-accept-btn'/>
                        <AiFillCloseCircle onClick={handleRejectFriendRequest} title='Reject' className='btns request-reject-btn'/>
                    </div>)
                    :''}
            </div>)
      }
      return (
        <React.Fragment>
            <div className="list-group-container-div">
            { totalNotification !== 0?(     
                <InfiniteScrollableComponent
                    renderChild={renderHTML}
                    scrollOfComponent = 'notification_page_scroll'
                    dataLoader= {dataLoader}
                    dataArray = {items?.sort(compareDateDesc)}
                    identifier = {{user_id: user}}
                    moreDataAvailable = {moreDataAvailable}
                    pageNo = {pageNo}
                    loading = {loading}
                />)
                
                :(<span className="no-new-notif">No new notifications</span>)} 
            </div>
        </React.Fragment>
      )
}
 
export default ListGroupComponent;