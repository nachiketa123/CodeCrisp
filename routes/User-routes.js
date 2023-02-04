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
        const { name, email, phoneno, age, password } = req.body //Destructoring..
        const user_obj =  { name, email, phoneno, age, password }

        //Validation
        const {errors, isValid} = registerInputValidation(user_obj)
        if(!isValid) return res.status(200).json(errors) 

        const newUser = User(user_obj)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash
                newUser.save().then(
                    user => {
                        res.status(200).json({success:true})
                    }
                ).catch(
                    err => {
                        res.status(400).json(err)
                    }
                )
            })
        })
    })


/*
    @route:     /api/user/login
    @desc:      For Login in the registered user 
    @access:    Public
*/
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

module.exports = router