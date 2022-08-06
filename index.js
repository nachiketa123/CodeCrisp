const express = require("express");
const mongo = require("mongoose");
const dbURI = require("./config/Key").mongoURI;
const userRoute = require("./routes/User-routes")
const app = express();
const bodyParser = require("body-parser")


mongo.connect(dbURI).then(
    () => {
        console.log("Mongoose Connected")
    }
).catch(
    (err) => {
        console.log(err)
    }
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', userRoute)

app.listen(5000, () => {
    console.log("Server challu ho gya hai")
});
