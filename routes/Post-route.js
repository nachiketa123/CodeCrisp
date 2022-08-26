const express = require('express');
const UserPost = require('../model/UserPost')
const cloudinary = require('../config/cloudinary')
const isEmpty = require('../utility/is-empty')
const passport = require('passport')
const router = express.Router();

const uploadImagesToCloudinary = (imageUrls) =>{
    return new Promise(async (resolve,reject)=>{
        const imageUrlsAfterUpload = [];
        for(let i=0; i<imageUrls.length; ++i){
            try{
                let uploadRes = await cloudinary.uploader.upload(imageUrls[i],{ upload_preset: 'codecrisp_media'})
                imageUrlsAfterUpload.push(uploadRes.url)
            }
            catch(error){
                console.error('Error: Something went wrong while uploading images '+error);
            }
            
        }
        resolve(imageUrlsAfterUpload)   
    })
    
}

router.post('/addPost',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    const { imageUrls, postText, location, name, user } = req.body;
    const errors ={};
    
    if(!isEmpty(imageUrls)){
        uploadImagesToCloudinary(imageUrls).then(urls=>{
            const newPostData = {
                imageUrls: urls,
                postText,
                location,
                name,
                user
            }
            const newPost = new UserPost(newPostData)
            newPost.save()
                    .then(data=>{
                        return res.status(200).json(data)
                    })
                    .catch(err=>{
                        errors.dberror = err
                        return res.status(400).json(errors)
                    })
        })
        .catch(err=>{
            errors.upload = err
            return res.status(403).json(errors)
        })
        
    }

    
})

router.get('/getAllUserPosts/:user_id',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const user_id = req.params.user_id;
    UserPost.find({user:user_id})
        .then(allPosts=>{
            return res.status(200).json(allPosts)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
})

module.exports = router;