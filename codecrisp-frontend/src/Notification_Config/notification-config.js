const NOTIFICATION = {
    EVENT_EMIT:{
        POST_LIKE: "post_like",
        POST_COMMENT: "post_comment",
        FRIEND_REQUEST: "friend_request"
    },

    EVENT_ON:{
        GET_POST_LIKE_NOTIFICATION:'get_post_like_notification',
        GET_POST_UNLIKE_NOTIFICATION:'get_post_unlike_notification',
        GET_POST_COMMENT_NOTIFICATION:'get_post_comment_notification',
        GET_FRIEND_REQUEST_NOTIFICATION:'get_friend_request_notification',
        
    }

}

export default NOTIFICATION;