// User schema using Mongoose, a popular Object Data Modeling (ODM) library for MongoDB.
// The schema specifies the structure of user data with fields such as name, email, password, and role.
// The code exports the user schema using the module.exports statement, which can be used in other parts of the application to create, read, update, and delete user data.

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
         required: true
    },
    email:{
        type: String,
         required: true,
        unique: true
    },
    password:{
        type: String,
         required: true
    },
    role:{
        type: String,
    }
})

module.exports = mongoose.model('signUp', userSchema)