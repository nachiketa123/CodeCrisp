const express = require('express');
const UserPost = require('../model/UserPost')
const isEmpty = require('../utility/is-empty')
const passport = require('passport')
const router = express.Router();
const FriendCollection = require('../model/Friend')

const User = require('../model/User');
const { default: mongoose } = require('mongoose');
const cloudinaryUploader = require('../utility/cloudinaryFileManager').uploadImagesToCloudinary;

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

// Our Friends Post 
const createPostArray = (friendList) => {
    const finalPostArray = []
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < friendList.length; ++i) {
            const user_id = friendList[i].user;
            const arr = await getPostForUser(user_id)
            finalPostArray.push(...arr)
        }
        resolve(finalPostArray)
    })

}

/*
    @route:     /api/post/addPost
    @desc:      To add new post for a user
    @access:    Private
*/
router.post('/addPost', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { imageUrls, postText, location, name, user } = req.body;
    const errors = {};

    if (!isEmpty(imageUrls)) {

        cloudinaryUploader(imageUrls).then(urls => {

            //Fetch Users avatar to be added in Post
            User.findById(user)
                .then(myuser => {
                    const newPostData = {
                        imageUrls: urls,
                        postText,
                        location,
                        name,
                        user,
                        avatar: myuser.avatar
                    }
                    const newPost = new UserPost(newPostData)
                    newPost.save()
                        .then(data => {
                            return res.status(200).json(data)
                        })
                        .catch(err => {
                            errors.dberror = err
                            return res.status(400).json(errors)
                        })
                }).catch(err => {
                    errors.pageNotFound = 'user not found ' + err
                    return res.status(404).json(errors)
                })

        })
            .catch(err => {
                errors.upload = err
                return res.status(403).json(errors)
            })

    }


})



/*
    @route:     /api/post/getAllUserPosts/:user_id
    @desc:      To get all the post of the user and also all the posts of all the user's friends
    @access:    Private
*/
router.get('/getAllUserPosts/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const user_id = req.params.user_id;
    //Find all the friends
    FriendCollection.findOne({ user: user_id })
        .then(async data => {
            let friendList =[];
            let finalPostArray = [];
            if(data){
                friendList = [...data.friend_list];
                finalPostArray = await createPostArray(friendList)
            }
            
            const usersPost = await getPostForUser(user_id)
            finalPostArray.push(...usersPost)
            return res.status(200).json(finalPostArray)
        })

})

/*
    @route:     /api/post/getAllUserPosts1/:user_id
    @desc:      To get all the post of the user and also all the posts of all the user's friends
    @access:    Private
*/
router.get('/getAllUserPosts1/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user_id = req.params.user_id;

    let {page} = req.query;
    if(isEmpty(page) || page===0){
        page=0 //initial page
    }
    //limit is number of posts per page
    let limit = 2;

    UserPost.aggregate([
        {
            $lookup:{
                from:"friends_datas",
                pipeline:[
                    {
                        $match:{
                            "user":mongoose.Types.ObjectId(user_id)
                        }
                    }
                ],
                as:"all_friends"
            }
        }
        ,{
            $unwind:"$all_friends"
        }
        ,{
            $project:{
                user:1,
                name:1,
                postText:1,
                avatar:1,
                likes:1,
                comments:1,
                date:1,
                imageUrls:1,
                friend_list:"$all_friends.friend_list"
            }
        }
        ,{
            $match:{
                $expr:{
                    $or:[
                        {$eq:["$user",mongoose.Types.ObjectId(user_id)]},
                        {$in:["$user","$friend_list.user"]}
                    ]
                }
            }
        }
        ,{
            $sort:{date:-1}
        },{
            $skip: page*limit
        }
        ,{
            $limit: limit
        }
        
        
       
    ]).then(data=>{
        res.json(data)
    })


})

/*
    @route:     /api/post/getAllUserPosts/:user_id
    @desc:      To get all the post of specific user only
    @access:    Private
*/
router.get('/getUserPostsByUserId/:user_id'
    , passport.authenticate('jwt', { session: false })
    , async (req, res) => {

        const user_id = req.params.user_id;
        const error = {}
        //Find all the users post
        try {
            const usersPost = await getPostForUser(user_id)
            return res.status(200).json(usersPost)
        } catch (err) {
            error.dberror = 'DB error'
            return res.status(403).json(dberror)
        }

    })


/*
    @route:     /api/post/get-comment
    @desc:      To get all the comment of that post
    @access:    Private
*/
router.get('/get-comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const post_id = req.params.post_id;

    UserPost.findById(post_id).then(
        post => {
            return res.status(200).json(post.comments);
        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )

})


/*
    @route:     /api/post/add-comment
    @desc:      To post the comment in a post  
    @access:    Private
*/
router.post('/add-comment/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {


    const { user, name, text, avatar } = req.body;

    const post_id = req.params.post_id;

    UserPost.findById(post_id).then(

        post => {
            post.comments.push({ user, name, text, avatar });
            post.save().then(
                p => {
                    return res.status(200).json({ success: true });
                }
            )
        }

    )
})

/*
    @route:     /api/post/likePost
    @desc:      To like the post  
    @access:    Private
*/

 
router.post('/likePost', passport.authenticate('jwt', { session: false }) , (req,res) =>{
       
       const {user_id , post_id} = req.body;
       UserPost.findById(post_id).then(
          post =>{
          
             if(post.likes.filter(e =>  (String(e.user) === user_id)).length != 0){
                console.log("already liked")
                post.likes = post.likes.filter(e =>  (String(e.user) !== user_id));
             
             }
             else{              
                 post.likes.push({user:user_id});
                 
                
             }
             
             post.save().then(
                p => {
                    return res.status(200).json({ success: true });
                }
             )
          }
       )
       
} )


router.get('/post/:post_id',(req,res) =>{
    const postId = req.params.post_id;
    UserPost.findById(postId).then(
        post => {
            return res.status(200).json(post);
        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )

})


module.exports = router;