// module.exports = mongoose.Model("User", userSchema)
const User = require("../models/userModel");

// login and connect database by async fun
const loginUser = async (req, res)=>{
    res.json({mssg: "login user"})
};

// signup 註冊
const signupUser = async function(req, res){
    // email, password from request body to server
    const { email, password} = req.body;
    // res.json({ email, password})
    try {
        const user = await User.signup(email, password) // use static method
        // because 'return user' from ' userSchema.statics.signup of useModel.js '
        // user Obj is created mongoDB
        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = {loginUser, signupUser};