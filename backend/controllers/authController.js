const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

//Generate JWT Token
const generateToken = (id) =>{
     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1h"});
};

//Register User
exports.registerUser = async (req, res) => {
     const {fullName, email, password} = req.body;
     
     //Validation : Check for missing fields
     if(!fullName || !email || !password){
          return res.status(400).json({message:"All the fields are required."});
     }

     try{
          // check if user already exists
          const existingUser = await User.findOne({email:email});
          if(existingUser){
               return res.status(400).json({message:"Email already in use."})
          }

          //Create the user
          const user = await User.create({
               fullName:fullName,
               email:email,
               password:password,
          });

          res.status(201).json({
               id:user._id,
               user,
               token:generateToken(user.id),
          });
     }
     catch (err) {
          res.status(500).json({message:"Error registering user", error:err.message});
     }
}

//Login User
exports.loginUser = async (req, res) => {
     const {email, password}=req.body;
     // console.log(email, password);
     

     if(!email || !password){
          return res.status(400).json({message:"All fields required."});
     }
     try {
          const user=await User.findOne({email:email});
          console.log(user.password);
          
          if(!user){
               return res.status(400).json({message:"The given email is not registered."});
          }
          console.log("Hey!");
          
          if(!await user.comparePassword(password)){
               console.log("HERE\n");
               return res.status(400).json({message:"Incorrect password entered."});
          }
          
          res.status(200).json({
               id:user._id,
               user,
               token:generateToken(user._id),
          });
     } catch (error) {
          console.error("Login error:", error);
          res.status(500).json({message:"Error logging in.", error:error.message});
     }


}

//Get user info
exports.getUserInfo = async (req, res) => {
     
}
