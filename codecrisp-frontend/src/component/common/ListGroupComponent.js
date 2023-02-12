import React from 'react';
import './ListGroupComponent.css'
import getContentFromNotificationType from '../../utility/getContentFromNotificationType';
import { compareDateDesc } from '../../utility/custom-sort';
import { timeSince } from '../../utility/dateFormat';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import NOTIFICATION from '../../Notification_Config/notification-config';

const ListGroupComponent = ({ items, acceptFriendRequest,rejectFriendRequest, user}) => {
    return (
        <React.Fragment>
            <div className="list-group-container-div">
                {items?.sort(compareDateDesc).map(item=>(
                <div className="cs-list-group">
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
                        : (<div className='friend-request-action-btns-div'>
                            <AiFillCheckCircle onClick={e=>acceptFriendRequest({
                                                                                sender_user_id: user,
                                                                                recipient_user_id: item.source.user
                                                                            })} title='Accept' className='btns request-accept-btn'/>
                            <AiFillCloseCircle onClick={e=>rejectFriendRequest({
                                                                                sender_user_id: user,
                                                                                recipient_user_id: item.source.user
                                                                            })} title='Reject' className='btns request-reject-btn'/>
                        </div>)}
                </div>))}
            </div>
        </React.Fragment>
      );
}
 
export default ListGroupComponent;