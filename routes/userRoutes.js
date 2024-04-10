const express = require('express'),
const router = express.Router();
const User = require('./../models/user.models');
const { json } = require('body-parser');


// sign up 
router.post('/signup' , async (req,res)=>{
 
    try {
        
        const data = req.body   // Assuming the body contains user data

        // create a new user using user model

        const newUser = new User(data)
        //save the person data 
        const response = await newUser.save();
        console.log("Data saved");
        
        const payLoad ={
            id:response.id
        }
        console.log(JSON.stringify(payLoad));
        
        const token = generateToken(payLoad);
        console.log("Token generated Successfuly " , token);

        res.status(200).json({response : response ,token:token})

    } catch (error) {

        console.log(error);
        res.status(500).json({error : "error during user data saving"})

    }

})

// login route

router.post('/login' , async (req,res)=>{
    try {
        // Extract the adhar no and password form the body 
        const {addharCardNumber,password} = req.body;
        
        // Find the user by adharcard no 
        const user = await User.findOne({addharCardNumber:addharCardNumber})

        // if user doesnot exist or password doesnot match then 

        if(!user || (await user.comparePassword(password))){
            return res.status(500).json({error:"Invalid username or password"})
        }

        // generate Token 
        const payLoad = {
            id:user.id
        }
        const token = generateToken(payLoad)
        // return token as response 
        res.json({token})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "error during user login"})
    }
})