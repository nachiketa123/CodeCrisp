import React from 'react';
import './ListGroupComponent.css'
import getContentFromNotificationType from '../../utility/getContentFromNotificationType';
import { compareDateDesc } from '../../utility/custom-sort';
import { timeSince } from '../../utility/dateFormat';

const ListGroupComponent = ({ items}) => {
    return (
        <React.Fragment>
            <div className="list-group-container-div">
                {items?.sort(compareDateDesc).map(item=>(
                <div className="list-group">
                    <div className="list-item">
                        <img className="user-avatar-notification" src={item.source.avatar} alt=""/>
                    </div>
                    <div className="list-item">
                        <div className='item-user-info'>{item.source.name}</div>
                        <div className='item-content'>
                            <div className='notif-type'>{getContentFromNotificationType(item.type)}</div>
                            <div className='time-since'>{timeSince(item.date)}</div>
                        </div>
                    </div>
                    <div className="list-item">
                        <img className="action-item-img" src={item.action_item_img[0]} alt=""/>
                    </div>
                </div>))}
            </div>
        </React.Fragment>
      );
}
 
export default ListGroupComponent;