// Mongoose schema for a blog post model, with title and description fields that are both required and of type String.
// The code then exports the model as a named "blogPost" for use in other parts of the application.
// The "default" property is used when importing the mongoose module, indicating that the import should use the default export of the module.
// Overall, this code provides a clear and concise definition for a blog post model using the Mongoose ODM.

const mongoose = require('mongoose').default
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    }
})

module.exports=mongoose.model('blogPost', blogSchema)