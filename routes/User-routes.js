const express = require("express")
const User = require("../model/User")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../config/Key")
const cloudinary = require('../config/cloudinary')
const passport = require("passport")


router.post('/signup',
    (req, res) => {
        const { name, email, phoneno, age, password } = req.body //Destructoring..
        const newUser = User({ name, email, phoneno, age, password })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash
                newUser.save().then(
                    user => {
                        res.status(200).json(user)
                    }
                ).catch(
                    err => {
                        res.status(400).json(err)
                    }
                )
            })
        })
    })

router.post('/login', (req, res) => {
    const { email, password } = req.body //Destructoring..
    const err = {}
    User.findOne({ email }).then((user) => {
        if (!user) {
            err.email = "Email does not exist";
            return res.status(404).json(err);
        }
        else {
            bcrypt.compare(password, user.password).then((isMatched) => {
                if (!isMatched) {
                    err.password = "Incorrect Password";
                    return res.status(404).json(err);
                }
                else {
                    const payload = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
                        return res.status(200).json({ token: "Bearer " + token })

                    })
                }
            })
        }
    })

})

router.post('/update-profile-picture',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const { user_id,base64ImgURI } = req.body;
    const error ={}
    User.findById(user_id)
        .then( async user=>{
            if(user){ 
                const cloudinaryImg = await cloudinary.uploader.upload(base64ImgURI,{ upload_preset: 'codecrisp_media'})
                user.avatar = cloudinaryImg.url;
                user.save()
                    .then(user=>{
                        return res.status(200).json(user.avatar)
                    })
            }
            else{
                //return 404
                error.pageNotFound = 'User not found'
                return res.status(404).json(error)
            }
        } ).catch(err=>{
            error.pageNotFound = 'User not found '+err
            return res.status(404).json(error)
        })

})


module.exports = router