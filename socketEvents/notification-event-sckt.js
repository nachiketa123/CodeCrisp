const isEmpty = require('../utility/is-empty')
const SocketUtils = require('../utility/socketUtility')
const UserNotification = require('../model/UserNotification')
const mongoose = require('mongoose')


const NOTIFICATION = {
    EVENT_ON:{
        POST_LIKE:"post_like",
        POST_COMMENT:"post_comment",
    },

    EVENT_EMIT:{
        GET_POST_LIKE_NOTIFICATION:'get_post_like_notification',
        GET_POST_UNLIKE_NOTIFICATION:'get_post_unlike_notification',
        GET_POST_COMMENT_NOTIFICATION:'get_post_comment_notification',
    }

}

const checkIfSameNotificationAlreadyExist = (source={userId:''},reciever={userId:'',postId:''},notification_type='')=>{
    return new Promise((resolve,reject)=>{
        
        const filter = {
            user: mongoose.Types.ObjectId(reciever.userId)
        }

        UserNotification.findOne(filter)
        .then(data=>{
            if(!data || isEmpty(data.notification)) {
                resolve({ found: false, data: {}})
                return
            }
            const prevLength = data.notification.length;

            data.notification = data.notification.filter(notif => 
                    notif.type !== notification_type 
                && notif.source.user !== mongoose.Types.ObjectId(source.userId)
                && notif.action_item_id !== reciever.postId)
            
            const found = (data.notification.length !== prevLength)
            resolve({found, data: found ? data:{}})
        }).catch(err=>{
            reject("DB Error",err)
        })
    })
    
}

//utility function to add the notificaiton into the database
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

//utitility function to remove the notification from the database
const removeAndUpdateNotification = (notif_data) =>{
    const {user, notif_arr} = notif_data
    
    return new Promise((resolve,reject)=>{
        UserNotification.findOne({user:mongoose.Types.ObjectId(user)})
        .then(data=>{
            if(!data || isEmpty(data.notification)) { reject('DB Error no data found for the ID'); return; }

            data.notification = data.notification.filter(notif=> 
                notif.source.user.toString() !== notif_arr.source.user
                || notif.action_item_id !== notif_arr.action_item_id
                || notif.type !== notif_arr.type)

            data.save().then(d=>{
                resolve({success: true})
            }).catch(err=>{
                reject('DB Error on Save', err)
            })

            
        }).catch(err=>{
            reject('DB Error',err)
        })
        
    })
}

const notificationEventHandler = (socket,io,onlineUsers) =>{
    try{

    /* 
        EVENT: On POST Like
    */
    socket.on(NOTIFICATION.EVENT_ON.POST_LIKE, async(data)=>{
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

        // If the same notification already exist then sent unlike notification so that it is removed i.e. unlike
        const result = await checkIfSameNotificationAlreadyExist(
            {userId:newData.notification.at(0).source.user}
            ,{userId:newData.user,postId: newData.action_item_id}
            , newData.notification.at(0).type);


        if(result.found){
                try{
                    if(reciever)
                        io.to(reciever.socket_id).emit(NOTIFICATION.EVENT_EMIT.GET_POST_UNLIKE_NOTIFICATION,result.data)
                }catch(err){
                    console.error('error in unlike notification event', err)
                }
                
                removeAndUpdateNotification({user:newData.user,notif_arr:newData.notification.at(0)})
                return;
            }

        
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

    /* 
        EVENT: On POST Comment
    */
    socket.on(NOTIFICATION.EVENT_ON.POST_COMMENT,async (data)=>{
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
            io.to(reciever.socket_id).emit(NOTIFICATION.EVENT_EMIT.GET_POST_COMMENT_NOTIFICATION,{...newData,new_comment: data.new_comment}) 
        }

        //This function checks if notification array already exist for the user if yes then push new notificaiton in notification array
        //else create new notification object
        addOrUpdateNotification(newData)
            .then(data=>{
                // console.log('Notification saved')
            }).catch(err=>{
                console.log(err)
            })

    })

    }catch(err){
        console.error('notification-event-sckt error',err)
    }
}

module.exports = notificationEventHandler;