const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    , phoneno: {
        type: String,
        required: true
    }
    , age: {
        type: String,
        required: true
    }
    , password: {
        type: String,
        required: true
    }
    ,avatar:{
        type: String
    }
})


module.exports = mongoose.model("user_data", userSchema)  