const isEmpty = require('../utility/is-empty')
const SocketUtils = require('../utility/socketUtility')
const UserNotification = require('../model/UserNotification')

const NOTIFICATION = {
    EVENT_ON:{
        POST_LIKE:"post_like",
        POST_COMMENT:"post_comment",
    },

    EVENT_EMIT:{
        GET_POST_LIKE_NOTIFICATION:'get_post_like_notification',
        GET_POST_COMMENT_NOTIFICATION:'get_post_comment_notification',
    }

}

const addOrUpdateNotification = (notif_data) =>{

    return new Promise((resolve,reject)=>{
        UserNotification.findOne({ user: notif_data.user})
            .then( data =>{
                if(data){
                    data.notification = [...data.notification,...notif_data?.notification];
                    data.save().then(updated_notif_data=>{
                        resolve(updated_notif_data)
                        return;
                    })
                }
                else{
                    const newNotif = new UserNotification(notif_data)
                    newNotif.save()
                        .then(newNotification=>{
                            resolve(newNotification)
                            return;
                        }).catch(err=>{
                            reject(err)
                            return;
                        })
                }
            }).catch(err=>{
                reject(err)
            })
    })
    
}

const notificationEventHandler = (socket,io,onlineUsers) =>{
    socket.on(NOTIFICATION.EVENT_ON.POST_LIKE,(data)=>{
        const newData = {
            user: data.user,
            notification:[{
                type: NOTIFICATION.EVENT_ON.POST_LIKE,
                action_item_id: data._id,
                action_item_img: data.imageUrls,
                source: {
                    user:data.user_who_did,
                    name: data.name,
                    avatar: data.avatar
                },
                seen: false,
                date: Date.now()
            }]
        }

        // If the source and reciver user are same then don't do anything i.e. return from function
        if(data.user.toString() === data.user_who_did.toString()) return;

        // else do below
        const reciever = SocketUtils.getUser(onlineUsers, data.user)
        if(!isEmpty(reciever) && !isEmpty(reciever.socket_id)){
            io.to(reciever.socket_id).emit(NOTIFICATION.EVENT_EMIT.GET_POST_LIKE_NOTIFICATION,newData) 
        }

        //This function checks if notification already exist for the user if yes then push new notificaiton in notification array
        //else create new notification object
        addOrUpdateNotification(newData)
            .then(data=>{
                // console.log('Notification saved')
            }).catch(err=>{
                console.log(err)
            })            
    })

    socket.on(NOTIFICATION.EVENT_ON.POST_COMMENT,(data)=>{
        const newData = {
            user: data.user,
            notification:[{
                type: NOTIFICATION.EVENT_ON.POST_COMMENT,
                action_item_id: data._id,
                action_item_img: data.imageUrls,
                source: {
                    user:data.user_who_did,
                    name: data.name,
                    avatar: data.avatar
                },
                seen: false,
                date: Date.now()
            }]
        }

         // If the source and reciver user are same then don't do anything i.e. return from function
         if(data.user.toString() === data.user_who_did.toString()) return;

         // else do below
        const reciever = SocketUtils.getUser(onlineUsers, data.user)
        if(!isEmpty(reciever) && !isEmpty(reciever.socket_id)){
            io.to(reciever.socket_id).emit(NOTIFICATION.EVENT_EMIT.GET_POST_COMMENT_NOTIFICATION,newData) 
        }

        //This function checks if notification already exist for the user if yes then push new notificaiton in notification array
        //else create new notification object
        addOrUpdateNotification(newData)
            .then(data=>{
                // console.log('Notification saved')
            }).catch(err=>{
                console.log(err)
            })

    })
}

module.exports = notificationEventHandler;