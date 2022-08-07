const mongoose = require("mongoose");
const passport = require("passport");
const secretKey = require("./Key").secretKey;
const User = require("../model/User");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Strategy = require("passport-jwt").Strategy;

const option = {}

option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
option.secretOrKey = secretKey;


const passportConfig = (passport) => {
    passport.use(new Strategy(option, (jwtPayload, done) => {
        User.findById(jwtPayload.id).then(
            user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }
        ).catch(
            err => {
                console.log("Auth Error passport.js");
            }
        )
    }))
}

module.exports = passportConfig;