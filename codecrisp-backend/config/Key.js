require('dotenv').config();

const config = {
    mongoURI: process.env.MONGO_URI,
    secretKey: process.env.MONGO_SECRET
}

module.exports = config