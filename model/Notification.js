const mongoose = require("mongoose");

const schema = mongoose.Schema;


const NotificationSchema = new schema({

    community_notification: {
        type: String,
       
    },  tech_notification: {
        type: String,
       
    },  quotes_notification: {
        type: String,
       
    },

})

module.exports = mongoose.model("gloabal_notification_data", NotificationSchema)  