// Mongoose schema for an admin user, which contains fields for name, email, password, and role.
// The mongoose module is required, and a Schema object is created from it.
// The adminSchema is defined using the Schema object and its fields are specified with their data types and validation requirements.
// Finally, the schema is exported as a Mongoose model with the name adminUser.
// This model can be used to interact with an admin user collection in a MongoDB database.

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
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
        required: true
    }
})

module.exports = mongoose.model('adminUser', adminSchema)