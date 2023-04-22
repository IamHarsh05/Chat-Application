const router = require("express").Router();
const User = require('../Models/User.js');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req, res) => {
    try {
        // Password Encryption
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //New User 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        // Save new user
        const user = await newUser.save();
        res.status(200).json(user);     
    } 
    catch (err) {
        res.status(500).json(err)
    }  
});

//login
router.post('/login', async (req, res) => {
    console.log(req)
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.json("user not found");
        
        console.log(req)
        // res.status(404).json(req);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.json("wrong password");

        // res.status(404).json(req);
                
        res.status(200).json(user);
    } 
    catch(error){
        res.status(500).json(error);   
        console.log(error);
    }
});

module.exports = router;