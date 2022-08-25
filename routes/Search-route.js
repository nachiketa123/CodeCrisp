const express = require("express")
const User = require("../model/User")
const router = express.Router()
const passport = require('passport')

router.get('/', passport.authenticate('jwt',{session:false}), (req, res) => {

    const { searchText } = req.query;
    if(searchText === "" || searchText === undefined)
        return res.status(200).json([])
    User.find({ "name": { "$regex": searchText, "$options": "i" } }).limit(5).then(
        user => {

            const searchUserdata = [];
            user.map(e => {

                const searchedUser = { name: e.name, _id: e._id };
                searchUserdata.push(searchedUser)
            })
            return res.status(200).json(searchUserdata);
        })

})

module.exports = router