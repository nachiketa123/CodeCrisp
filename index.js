const express = require("express");
const mongo = require("mongoose");
const dbURI = require("./config/Key").mongoURI;

const app = express();

mongo.connect(dbURI).then(
    () => {
        console.log("Mongoose Connected")
    }
).catch(
    (err) => {
        console.log(err)
    }
)

app.listen(5000, () => {
    console.log("Server challu ho gya hai")
});
