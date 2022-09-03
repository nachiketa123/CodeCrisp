const isEmpty = require('../utility/is-empty')
const SocketUtils = require('../utility/socketUtility')
const UserNotification = require('../model/UserNotification')

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
    socket.on('post_like',(data)=>{
        const newData = {
            user: data.user,
            notification:[{
                type: 'post_like',
                action_item_id: data._id,
                source: {
                    user:data.user_who_liked,
                    name: data.name,
                    avatar: data.avatar
                },
                seen: false
            }]
        }
        const reciever = SocketUtils.getUser(onlineUsers, data.user)
        if(!isEmpty(reciever) && !isEmpty(reciever.socket_id)){
            io.to(reciever.socket_id).emit('get_post_like_notification',newData) 
        }

        //check if notification already exist for the user if yes then push new notificaiton in notification array
        //else create new notification object
        addOrUpdateNotification(newData)
            .then(data=>{
                console.log('Notification saved')
            }).catch(err=>{
                console.log(err)
            })            
    })
}

module.exports = notificationEventHandler;