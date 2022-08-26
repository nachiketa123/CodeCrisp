const express = require('express');
const UserPost = require('../model/UserPost')
const cloudinary = require('../config/cloudinary')
const isEmpty = require('../utility/is-empty')
const passport = require('passport')
const router = express.Router();
const FriendCollection = require('../model/Friend')

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

const getPostForUser = (user_id) =>{
    return new Promise((resolve,reject)=>{
        UserPost.find({user:user_id})
        .then(allPosts=>{
            resolve(allPosts) 
        })
        .catch(err=>{
            reject(err) 
        })
    })
    
}

 const createPostArray = (friendList) =>{
    const finalPostArray = []
    return new Promise(async (resolve,reject)=>{
        for(let i = 0; i< friendList.length; ++i){
            const user_id = friendList[i].user;
            const arr = await getPostForUser(user_id)
            finalPostArray.push(...arr)
        }
        resolve(finalPostArray)
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
    //Find all the friends
    FriendCollection.findOne({user: user_id})
        .then(async data=>{
            const friendList = data.friend_list;
            const finalPostArray = await createPostArray(friendList)
            const usersPost = await getPostForUser(user_id)
            finalPostArray.push(...usersPost)
            return res.status(200).json(finalPostArray)

            
        })
    
})

module.exports = router;