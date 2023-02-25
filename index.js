const express = require("express");
const mongo = require("mongoose");
const dbURI = require("./config/Key").mongoURI;
const passport = require("passport");
const PassportConfig = require("./config/Passport");
const userRoute = require("./routes/User-routes")
const app = express();
const bodyParser = require("body-parser");
const searchRoute = require("./routes/Search-route")
const jobRoute = require('./routes/Job-route');
const postRoutes = require('./routes/Post-route')
const friendRoutes = require('./routes/Friend-route')
const userProfileRoutes = require('./routes/profile-route')
const notificationRoutes = require('./routes/Notification-route')
const createServer = require('http').createServer
const Server = require('socket.io').Server
const SocketUtils = require('./utility/socketUtility')
const {notificationEventHandler,initializeNotificationEventHandlerFile} = require('./socketEvents/notification-event-sckt');
const globalnotification =require('./routes/globalNotification-route')
const chatRoute = require('./routes/Chat-routes')
const path = require('path');


//dotenv
require('dotenv').config();

mongo.connect(dbURI).then(
    () => {
        console.log("Mongoose Connected")
    }
).catch(
    (err) => {
        console.log(err)
    }
)

app.use(passport.initialize());
PassportConfig(passport);



app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }))
app.use(bodyParser.json({ limit: '100mb' })),

app.use('/api/user', userRoute)
app.use('/api/searchuser', searchRoute)
app.use('/api/jobs', jobRoute)
app.use('/api/post', postRoutes)
app.use('/api/friend', friendRoutes)
app.use('/api/user-profile', userProfileRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/gnotification',globalnotification);
app.use('/api/chat',chatRoute);

const httpServer = createServer(app);
const io = new Server(httpServer)





const onlineUsers = [];
try{
    io.on('connection', (socket) => {
        // console.log('new socket_id: ',socket.id)
        io.emit('server_conn', 'Welcome! You are now connected with the Server')
        try{
            socket.on('add_new_user', (user_id) => {
            //    console.log('adding new user',user_id)
        
                if (user_id) {
                    // console.log('before adding',onlineUsers)
                    SocketUtils.addNewUser(onlineUsers, user_id, socket.id)
                }
        
            //   console.log('after adding',onlineUsers)
            })
        }catch(err){
            // console.error('Error occurred while adding new user:',err)
        }
    
        
        //  notification event handled in other file
        notificationEventHandler(socket, io, onlineUsers) 
        
        initializeNotificationEventHandlerFile(socket,io,onlineUsers)
        
        
        socket.on('disconnect', () => {
            SocketUtils.removeUser(onlineUsers, socket.id)
            // console.log('user disconnected ',onlineUsers)
        })


    })
}catch(err){
    console.log('error in index.js due to socket', err)
}

  const port = process.env.PORT || 8070;

httpServer.listen(port, () => {
    console.log("Server challu ho gya hai")
});

app.use(express.static(path.join(__dirname, "./codecrisp-frontend/build")));

app.get("/", function(_, res) {
    res.sendFile(
        path.join(__dirname, "./codecrisp-frontend/public/index.html"),
        function (err) {
            if(err) {
                res.status(500).send(err)
            }
        }
    )
})