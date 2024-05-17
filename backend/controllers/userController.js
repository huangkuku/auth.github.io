// module.exports = mongoose.Model("User", userSchema)
const User = require("../models/userModel");
// login
const loginUser = async (req, res)=>{
    res.json({mssg: "login user"})
}

// signup
const signupUser = async (req, res)=>{
    res.json({mssg: "signup user"})
}

module.exports = {loginUser, signupUser};