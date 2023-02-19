const isEmpty = require('../utility/is-empty')
const SocketUtils = require('../utility/socketUtility')
const UserNotification = require('../model/UserNotification')
const mongoose = require('mongoose')


let onlineUserList = []
let io,socket;

const initializeNotificationEventHandlerFile = (socket,io,onlineUserList) =>{

    //we use global because the global variable define here are with the same name as in the parameter 
    global.io = io
    global.socket = socket
    global.onlineUserList = onlineUserList 
}
const NOTIFICATION = {
    EVENT_ON:{
        POST_LIKE:"post_like",
        POST_COMMENT:"post_comment",
        FRIEND_REQUEST: "friend_request",
        FRIEND_REQUEST_CANCEL: "friend_request_cancel",
        FRIEND_REQUEST_REJECT: "friend_request_reject",
        FRIEND_REQUEST_ACCEPT: "friend_request_accept",
        UNFRIEND_REQUEST: "unfriend_request",
        SEND_MESSAGE_TO_USER: "SEND_MESSAGE_TO_USER",
    },

    EVENT_EMIT:{
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
                !(
                    notif.type === notification_type 
                    && notif.source.user.toString() === source.userId
                    && notif.action_item_id === reciever.postId
                ))
            
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

//utility function to remove the notification from the database
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
    
        onlineUserList = onlineUsers

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
            ,{userId:newData.user,postId: newData.notification.at(0).action_item_id}
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

        //creating new notification object
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

     /* 
        EVENT: On Friend Request
    */

    socket.on(NOTIFICATION.EVENT_ON.FRIEND_REQUEST,async (data)=>{
        //creating new notification object
        const newData = {
            user: data.user,
            notification:[{
                type: NOTIFICATION.EVENT_ON.FRIEND_REQUEST,
                source: {
                    user:data.source.user,
                    name: data.source.name,
                    avatar: data.source.avatar
                },
                seen: false,
                date: Date.now()
            }]
        }

         // If the source and reciver user are same then don't do anything i.e. return from function
         if(data.user.toString() === data.source.user.toString()) return;

         // else do below
        const reciever = SocketUtils.getUser(onlineUsers, data.user)

        if(!isEmpty(reciever) && !isEmpty(reciever.socket_id)){
            io.to(reciever.socket_id).emit(NOTIFICATION.EVENT_EMIT.GET_FRIEND_REQUEST_NOTIFICATION,newData) 
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



const notificationEventEmitter = (notification_to_emit,reciever_user_id,payload={}) => {
    const reciever = SocketUtils.getUser(onlineUserList, reciever_user_id)
    if(!isEmpty(reciever) && !isEmpty(reciever.socket_id)){
        
        if(isEmpty(payload))
            payload = {success: true}
        try{
        console.log(payload)
            global.io.to(reciever.socket_id).emit(notification_to_emit,payload)
        }catch(err){
            console.log('error while emitting event ', err)
            return err
        }
        
    }
}
module.exports = {notificationEventHandler,notificationEventEmitter, initializeNotificationEventHandlerFile, NOTIFICATION};