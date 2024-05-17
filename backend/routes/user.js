const express = require("express");

const router =express.Router();
const {loginUser, signupUser} = require("../controllers/userController"); // import user controller func

// user routes login route
router.post("/login", loginUser); // url http://localhost:4000/api/user/login

// signup route
router.post("/signup", signupUser);


module.exports = router;