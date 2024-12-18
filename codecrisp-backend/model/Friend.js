const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendCollection = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user_datas'
    },
    friend_list: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user_datas'
        },
        isCloseFriend: {
            type: Boolean,
            default: false
        },
        friendship_start_date: {
            type: Date,
            default: Date.now
        }
    }],

})

module.exports = mongoose.model('friends_data', FriendCollection);