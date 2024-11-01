const express = require("express")
const User = require("../model/User")
const router = express.Router()
const passport = require('passport')

/*
    @route:     /api/searchUser/
    @desc:      To search users in the system using their name regex
    @access:    Private
*/

router.get('/', passport.authenticate('jwt',{session:false}), (req, res) => {

    const { searchText } = req.query;
    if(searchText === "" || searchText === undefined)
        return res.status(200).json([])
    User.find({ "name": { "$regex": searchText, "$options": "i" } }).limit(5).then(
        user => {

            const searchUserdata = [];
            user.map(e => {

                const searchedUser = { name: e.name, _id: e._id, avatar:e.avatar };
                searchUserdata.push(searchedUser)
            })
            return res.status(200).json(searchUserdata);
        })

})

module.exports = router