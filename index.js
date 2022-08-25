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



app.use(bodyParser.urlencoded({limit:'100mb', extended: false }))
app.use(bodyParser.json({limit:'100mb'})),

app.use('/api/user', userRoute)
app.use('/api/searchuser', searchRoute)
app.use('/api/jobs', jobRoute)
app.use('/api/post',postRoutes)

app.listen(5000, () => {
    console.log("Server challu ho gya hai")
});
