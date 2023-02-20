import React from 'react';
import './ListGroupComponent.css'
import getContentFromNotificationType from '../../utility/getContentFromNotificationType';
import { compareDateDesc } from '../../utility/custom-sort';
import { timeSince } from '../../utility/dateFormat';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import NOTIFICATION from '../../Notification_Config/notification-config';
import InfiniteScrollableComponent from './infinite-scrollable-component/InfiniteScrollableComponent';
import getClassNames from '../../utility/getClassNames';

const ListGroupComponent = ({ 
    items, 
    acceptFriendRequest,
    rejectFriendRequest, 
    user,
    dataLoader,
    moreDataAvailable,
    pageNo,
    loading,
    isFriendWithUser,
}) => {
 
      const renderHTML = (item) => {
        return (
            <div className={getClassNames({dc:"cs-list-group",cc:"cs-list-group-seen"},item.seen,true)}>
                <div className="cs-list-item">
                    <img className="user-avatar-notification" src={item.source.avatar} alt=""/>
                </div>
                <div className="cs-list-item">
                    <div className='item-user-info'>{item.source.name}</div>
                    <div className='item-content'>
                        <div className='notif-type'>{getContentFromNotificationType(item.type)}</div>
                        <div className='time-since'>{timeSince(item.date)}</div>
                    </div>
                </div>
                {item.type !== NOTIFICATION.EVENT_EMIT.FRIEND_REQUEST
                    ?(<div className="cs-list-item">
                        <img className="action-item-img" src={item.action_item_img[0]} alt=""/>
                    </div>)
                    : isFriendWithUser === 2? (<div className='friend-request-action-btns-div'>
                        <AiFillCheckCircle onClick={e=>{ if(!item.seen) return acceptFriendRequest({
                                                                            sender_user_id: user,
                                                                            recipient_user_id: item.source.user
                                                                        })}} title='Accept' className='btns request-accept-btn'/>
                        <AiFillCloseCircle onClick={e=>{if(!item.seen) return rejectFriendRequest({
                                                                            sender_user_id: user,
                                                                            recipient_user_id: item.source.user
                                                                        })}} title='Reject' className='btns request-reject-btn'/>
                    </div>):''}
            </div>)
      }
      return (
        <React.Fragment>
            <div className="list-group-container-div">
                <InfiniteScrollableComponent
                    renderChild={renderHTML}
                    scrollOfComponent = 'notification_page_scroll'
                    dataLoader= {dataLoader}
                    dataArray = {items?.sort(compareDateDesc)}
                    identifier = {{user_id: user}}
                    moreDataAvailable = {moreDataAvailable}
                    pageNo = {pageNo}
                    loading = {loading}
                />
                {}
            </div>
        </React.Fragment>
      )
}
 
export default ListGroupComponent;