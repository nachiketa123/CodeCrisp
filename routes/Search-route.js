const express = require("express")
const User = require("../model/User")
const router = express.Router()

router.get('/searchuser', (req, res) => {

    // console.log(req.user);
    const { searchText } = req.body;

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