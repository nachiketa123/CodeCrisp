const express = require("express")

const User = require("../model/User")

const router = express.Router()

const bcrypt = require("bcryptjs")

const jwt= require("jsonwebtoken")
const { secretKey } = require("../config/Key")

router.post('/signup',
    (req, res) => {
        const { name, email, phoneno, age, password } = req.body //Destructoring..
        const newUser = User({ name, email, phoneno, age, password })
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt ,(err,hash)=>{
                newUser.password=hash
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

router.post('/logIn',(req, res) =>{
    const{email, password}=req.body //Destructoring..
    const err={}
    User.findOne({email}).then((user)=>{
        if(!user){
            err.email="Email does not exist";
            return res.status(404).json(err);
        }
        else{
             bcrypt.compare(password,user.password).then((isMatched)=>{
                if(!isMatched){
                    err.password="Incorrect Password";
                    return res.status(404).json(err);
                }
                else{
                    const payload={id:user.id,
                    email:user.email,
                    name:user.name
                    }
                    jwt.sign(payload, secretKey, {expiresIn : 3600 }, (err,token)=>{
                        return res.status(200).json({token : "Bearer " + token})

                    })
                }
             })
        }
    })

})     
        


module.exports = router