const addNewUser = (onlineUsers=[],user_id,socket_id) =>{
    !onlineUsers.some(user=> user.user_id === user_id) && onlineUsers.push({
        user_id,
        socket_id
    })
}

const removeUser = (onlineUsers=[],socket_id) =>{
    onlineUsers = onlineUsers.filter(user=> user.socket_id !== socket_id)
}

const getUser = (onlineUsers=[],user_id) =>{
    const user =  onlineUsers.find(user=> user.user_id === user_id)
    // console.log(onlineUsers, user)
    return user;
}

module.exports = {addNewUser,removeUser,getUser}