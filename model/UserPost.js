const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserPost = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user_data'
    },
    name: {
        type: String,
        required: true
    },
    postText: { 
        type: String
    },
    avatar: {
        type: String
    },
    likes: [ 
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user_data'
            }
        }
    ],
    comments: [
        {
            id: {
                type: Schema.Types.ObjectId,
                require: true,
                unique: true,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user_data'
            },
            name: {
                type: String,
            },
            text: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    imageUrls: [{
        type: String,
    }
    ]
})

module.exports = mongoose.model('user-posts', UserPost);