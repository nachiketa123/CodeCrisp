const express = require("express")

const User = require("../model/User")

const router = express.Router()

router.post('/signup',
    (req, res) => {
        const { name, email, phoneno, age, password } = req.body //Destructoring..
        const newUser = User({ name, email, phoneno, age, password })
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


module.exports = router