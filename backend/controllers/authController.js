const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = () =>{
     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1h"});
};

//Register User
exports.registerUser = async (req, res) => {
     
}

//Login User
exports.loginUser = async (req, res) => {
     
}

//Get user info
exports.getUserInfo = async (req, res) => {
     
}
