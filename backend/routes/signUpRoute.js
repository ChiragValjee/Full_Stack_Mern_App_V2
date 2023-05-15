// The signUp route defines an Express router with routes for user registration, login, and social media authentication.
// The registerUser, loginUser, googleLogin, and facebookLogin functions are imported from the signUpController module and mapped to their respective routes using the post() method.
// The router is then exported for use in other modules.

const express = require('express')
const {
    registerUser,
    loginUser,
    googleLogin,
    facebookLogin
} = require('../controllers/signUpController');

let router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/googleLogin', googleLogin)
router.post('/facebookLogin', facebookLogin)

module.exports = router