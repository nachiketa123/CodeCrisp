import NOTIFICATION from "../Notification_Config/notification-config";

let content = ''
const getContentFromNotificationType = (type) =>{
    switch(type){

        case NOTIFICATION.EVENT_EMIT.POST_LIKE:
            content = 'liked your post'
            return content;
        case NOTIFICATION.EVENT_EMIT.POST_COMMENT:
            content = 'commented on your post'
            return content;
        case NOTIFICATION.EVENT_EMIT.FRIEND_REQUEST:
            content = "sent you a friend request"
            return content;
        default:
            return content
    }
}

export default getContentFromNotificationType;