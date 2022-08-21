const express = require("express");
const mongo = require("mongoose");
const dbURI = require("./config/Key").mongoURI;
const passport = require("passport");
const PassportConfig = require("./config/Passport");
const userRoute = require("./routes/User-routes")
const app = express();
const bodyParser = require("body-parser");
const searchRoute = require("./routes/Search-route")


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



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', userRoute)
app.use('/api/user', searchRoute)

app.listen(5000, () => {
    console.log("Server challu ho gya hai")
});
