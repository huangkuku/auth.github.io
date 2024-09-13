const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController') // import user controller func

const router = express.Router()

// login route
router.post('/login', loginUser) // url http://localhost:4000/api/user/login

// signup route
router.post('/signup', signupUser)

module.exports = router