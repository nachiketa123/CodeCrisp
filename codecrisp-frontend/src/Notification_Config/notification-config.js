const NOTIFICATION = {
    EVENT_EMIT:{
        POST_LIKE: "post_like",
        POST_COMMENT: "post_comment",
        FRIEND_REQUEST: "friend_request",
        FRIEND_REQUEST_CANCEL: "friend_request_cancel",
        FRIEND_REQUEST_REJECT: "friend_request_reject",
        FRIEND_REQUEST_ACCEPT: "friend_request_accept",
        UNFRIEND_REQUEST: "unfriend_request",
    },

    EVENT_ON:{
        GET_POST_LIKE_NOTIFICATION:'get_post_like_notification',
        GET_POST_UNLIKE_NOTIFICATION:'get_post_unlike_notification',
        GET_POST_COMMENT_NOTIFICATION:'get_post_comment_notification',
        GET_FRIEND_REQUEST_NOTIFICATION:'get_friend_request_notification',
        GET_FRIEND_REQUEST_CANCEL_NOTIFICATION:'get_friend_request_cancel_notification',
        GET_FRIEND_REQUEST_REJECT_NOTIFICATION:'get_friend_request_reject_notification',
        GET_FRIEND_REQUEST_ACCEPT_NOTIFICATION:'get_friend_request_accept_notification',
        GET_UNFRIEND_REQUEST_NOTIFICATION:'get_unfriend_request_notification',
        GET_NEW_MESSAGE_REQUEST_NOTIFICATION:'GET_NEW_MESSAGE_REQUEST_NOTIFICATION',
        
    }

}

export default NOTIFICATION;