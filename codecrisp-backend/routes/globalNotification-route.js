const express = require('express');
const passport = require('passport');
const router = express.Router();
const notification_model = require('../model/Notification');


router.get('/globalnotification'
// ,passport.authenticate('jwt',{session: false})
,(req,res) =>{
       
       notification_model.find().then(
          data =>{
            
            return res.status(200).json(data);
            
          }
       )

}
)

module.exports = router;