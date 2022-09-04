const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserNotification = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user_data'
    },
    notification: [
        {
            type:{
                type: String,
                required: true
            },
            action_item_id:{
                type: String,
            },
            action_item_img:[
                {
                    type:String
                }
            ],
            source:{
                isSystem:{
                    type: Boolean,
                    default: false
                },
                user:{
                    type: Schema.Types.ObjectId,
                    ref: 'user_data'
                },
                name:{
                    type: String,
                },
                avatar:{
                    type: String,
                },
            },
            seen:{
                type: Boolean,
                default: false
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = mongoose.model('user_notification',UserNotification);