// The sign-up controller defines a set of functions for registering, logging in, and authenticating users with Google and Facebook accounts.
// The registerUser function takes in user credentials as input, checks whether a user with the same email address already exists in the database, and creates a new user if they do not exist.
// The loginUser function takes in a user's email and password, checks if the email and password match an existing user in the database, and generates a JSON web token (JWT) for the authenticated user.
// The googleLogin and facebookLogin functions are used for authenticating users with their Google and Facebook accounts, respectively.
// These functions take in the username of the user's social media account and check if the user exists in the database before generating a JWT for the authenticated user.
// Overall, these functions are used to handle user authentication and authorization for a web application.
// Users are UNABLE to navigate to the home page if they did not register and log in.

const userInfo = require('../models/signUpModel')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const {response} = require("express");
const client = new OAuth2Client("803762574211-h0t59lbnd7mrrnog9qic18fvj0il90e4.apps.googleusercontent.com")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function registerUser(req, res) {
    const contentType = req.headers["content-type"]
    if (!contentType || !contentType.includes("application/json")) {
        res.status(415).send({error: "Unsupported content type"})
    }
    const {name, email, password} = req.body
    console.log(name, email, password)
    if (!name || !email || !password || email.indexOf("@gmail.com") === -1) {
        return res.status(403).json({error: "User has not entered credentials correctly"})
    }

    try {
        const existingUser = await userInfo.findOne({email})
        if (existingUser) {
            console.log('User already registered')
            return res.status(409).json({error: "Email already in use"})
        }
        const userLogin = await userInfo.create({name, email, password})
        res.status(200).json({status: "ok"})
        console.log("User successfully registered")

    } catch (error) {
        console.log(error)
        res.json({status: "error", error: "User was not successfully registered"})
    }
}

const secretKey = "mySecretKey"

function generateToken(userId) {
    return jwt.sign({userId}, secretKey, {expiresIn: "1h"})
}

async function loginUser(req, res) {
    const contentType = req.headers["content-type"]
    if (!contentType || !contentType.includes("application/json")) {
        res.status(415).send({error: "Unsupported content type"})
    }
    const {email, password} = req.body
    console.log(email, password)

    if (!email || !password) {
        console.log(`user has not put in their credentials properly`)
        return res.status(400).json({error: "Missing login credentials"})
    }

    try {
        const user = await userInfo.findOne({email})
        if (!user) {
            console.log(`User not found`)
            return res.status(401).json({error: "Incorrect email or password"})
        }

        if (password !== user.password) {
            console.log(`Incorrect password`)
            return res.status(401).json({error: "Incorrect password"})
        }

        const token = generateToken(user._id)
        console.log(token)

        res.json({user: token})
        console.log(`User logged in successfully`)


    } catch (error) {
        console.log(error)
        return res.json({status: "error"}) //Why did we put user = false

    }
}

async function googleLogin(req, res) {
    const {userName} = req.body
    console.log(userName)
    const existingUser = await userInfo.findOne({email: userName})
    if (existingUser) {
        const token = jwt.sign({email: existingUser.username}, secretKey, {expiresIn: "1h"})
        return res.json({status:"ok", existingUser: token})

    }else if(!existingUser){
        return res.json({status: "error", existingUser: false})
    }
}

async function facebookLogin(req, res){
    const {username} = req.body
    console.log(username)
    const existingUser = await userInfo.findOne({email: username})
    if (existingUser) {
        const token = jwt.sign({email: existingUser.username}, secretKey, {expiresIn: "1h"})
         return res.json({status:"ok", existingUser: token})

    }else if(!existingUser){
        return res.json({status: "error", existingUser: false})
    }
 }
module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    facebookLogin
}