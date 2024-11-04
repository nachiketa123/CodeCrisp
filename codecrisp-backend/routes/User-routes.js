const express = require("express")
const User = require("../model/User")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../config/Key")
// const cloudinary = require('../config/cloudinary')
const passport = require("passport")
const UserPost = require('../model/UserPost')
const cloudinaryUploader = require('../utility/cloudinaryFileManager').uploadImagesToCloudinary;
const deleteImagesFromCloudinary = require('../utility/cloudinaryFileManager').deleteImagesFromCloudinary;
const isEmpty = require("../utility/is-empty")
const registerInputValidation = require("../validation/register-validation");
const {createEntryWithZeroFriendOnUserSignup} = require("./Friend-route");
const {createZeroNotificationEntryOnUserSignup} = require('./Notification-route')
const loginInputValidation = require("../validation/login-validation")

const getPostForUser = (user_id) => {
    return new Promise((resolve, reject) => {
        UserPost.find({ user: user_id })
            .then(allPosts => {
                resolve(allPosts)
            })
            .catch(err => {
                reject(err)
            })
    })

}

const updateAvatarInAllPost = (postArray, avatarURL) => {
    return new Promise(async (resolve, reject) => {
        if (isEmpty(avatarURL)) {
            reject('Something went wrong while creating post array')
            return;
        }


        await postArray.map(async post => {
            post.avatar = avatarURL;
            await post.save()
        })
        resolve(postArray);

    })
}



/*
    @route:     /api/user/signup
    @desc:      For registering new user 
    @access:    Public
*/
router.post('/signup',
    (req, res) => {
        
        const {signInType} = req.body;
        
        if(signInType === 'codecrisp'){
            const { name, email, phoneno, age, password } = req.body //Destructoring..
            const user_obj =  { name, email, phoneno, age, password }
            
            //Validation
            const {errors, isValid} = registerInputValidation(user_obj)
            if(!isValid) return res.status(403).json(errors) 

            //Check if user already exists then send error 403
            User.findOne({email}).then(user=>{
                if(user && !isEmpty(user)){
                    errors.userAlreadyExists = "User Already exists"
                    return res.status(403).json(errors)
                }else{
                    const newUser = User(user_obj)
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash
                            newUser.save().then(
                                user => {
                                    //for friendList
                                    createEntryWithZeroFriendOnUserSignup(user._id)
                                    //for notification
                                    createZeroNotificationEntryOnUserSignup(user._id)
                                    res.status(200).json({success:true})
                                }
                            ).catch(
                                err => {
                                    res.status(400).json(err)
                                }
                            )
                        })
                    })
                }
            }).catch(err=>{
                return res.status(500).json(err)
            })
        
       }
       else{
          
        const { name, email, phoneno, age, password } = req.body //Destructoring..
        const user_obj =  { name, email, phoneno, age, password }
        
        //Validation
        // const {errors, isValid} = registerInputValidation(user_obj)
        const errors = {}
        const isValid = true
        if(!isValid) return res.status(200).json(errors) 

        //Check if user already exists then send error 403
        User.findOne({email}).then(user=>{
            if(user && !isEmpty(user)){
                errors.userAlreadyExists = "User Already exists"
                return res.status(403).json(errors)
            }else{

                    const newUser = User(user_obj)
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash
                            newUser.save().then(
                                user => {
                                    //for friendList
                                    createEntryWithZeroFriendOnUserSignup(user._id)
                                    //for notification
                                    createZeroNotificationEntryOnUserSignup(user._id)
                                    res.status(200).json({success:true})
                                }
                            ).catch(
                                err => {
                                    res.status(400).json(err)
                                }
                            )
                        })
                    })
            }
       
       })
    }})


/*
    @route:     /api/user/login
    @desc:      For Login in the registered user 
    @access:    Public
*/
router.post('/login', (req, res) => {
    const { email, password } = req.body //Destructoring..

    //Validation
    const {errors, isValid} = loginInputValidation({email,password})
    if(!isValid) return res.status(403).json(errors) 

    User.findOne({ email }).then((user) => {
        if (!user) {
            errors.email = "Email does not exist";
            return res.status(404).json(errors);
        }
        else {
            bcrypt.compare(password, user.password).then((isMatched) => {
                if (!isMatched) {
                    errors.password = "Incorrect Password";
                    return res.status(404).json(errors);
                }
                else {
                    const payload = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload, secretKey, { expiresIn: 3600 }, (errors, token) => {
                        return res.status(200).json({ token: "Bearer " + token })

                    })
                }
            })
        }
    })

})

/*
    @route:     /api/user/update-profile-picture
    @desc:      For Changing the user profile avatar, makes changes in user.avatar & all the users post avatar
    @access:    Private
*/

router.post('/update-profile-picture', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { user_id, base64ImgURI } = req.body;
    const error = {}
    User.findById(user_id)
        .then(async user => {
            if (user) {

                cloudinaryUploader([base64ImgURI])
                    .then(cloudinaryImg => {

                        //save previous url so that we can delete it after new avatar is saved
                        const previousAvatarURL = user.avatar
                        //change users avatar
                        user.avatar = cloudinaryImg[0];
                        user.save()
                            .then(async user => {

                                try {
                                    let UserPostArray = await getPostForUser(user_id)
                                    if (!isEmpty(UserPostArray)) {
                                        UserPostArray = await updateAvatarInAllPost(UserPostArray, cloudinaryImg[0]);

                                        //delete previous image from cloudinary
                                        let result = await deleteImagesFromCloudinary([previousAvatarURL])
                                    }

                                    return res.status(200).json(user.avatar)
                                } catch (err) {
                                    return res.status(400).json(err)
                                }

                            })
                    })
            }
            else {
                //return 404
                error.pageNotFound = 'User not found'
                return res.status(404).json(error)
            }
        }).catch(err => {
            error.pageNotFound = 'User not found ' + err
            return res.status(404).json(error)
        })

})

/*
    @route:     /api/user/change-password
    @desc:      To change user current password
    @access:    Private
*/
router.post('/change-password', passport.authenticate('jwt', { session: false }) ,(req,res)=>{
    const { oldPassword, newPassword, user_id } = req.body;
    const error = {}
    User.findById(user_id)
        .then(user=>{
            bcrypt.compare(oldPassword, user.password).then((isMatched) => {
                if (!isMatched) {
                    error.invalidPassword = 'old password is not valid'
                    res.status(403).json(error);
                }
                else{
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                            user.password = hash
                            user.save()
                                .then(user=>{
                                    return res.status(200).json('Password changed')
                                })
                        })
                    })
                }

        })
    })
})

/*
    @route:     /api/user/delete-account
    @desc:      To delete an user account
    @access:    Private
*/

router.delete('/delete-account',(req,res)=>{
    const {email} = req.body;
    User.findOne({email}).then(user=>{
        const errors = {}
        if(!user) {
            errors.userNotFound = "User does not exists"
            return res.status(404).json(errors)
        }
        //delete users posts -> also delete from cloudinary
        //delete user profile
        //delete user notification
        //delete user friend list

        //delete user itself
        user.delete().then(()=>{
            res.status(204).json({success:true})
        }).catch(err=>{
            res.status(403).json(err)
        })

    })
})

module.exports = router