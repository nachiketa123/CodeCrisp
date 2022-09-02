const SocketUtils = require('../utility/socketUtility')

const notificationEventHandler = (socket,io,onlineUsers) =>{
    socket.on('post_like',(data)=>{
        const reciever = SocketUtils.getUser(onlineUsers, data.user)
        const newData = {
            type: data.type,
            post_id: data._id,
            user_who_liked: data.user_who_liked
        }
        io.to(reciever.socket_id).emit('get_post_like_notification',newData)
    })
}

module.exports = notificationEventHandler;