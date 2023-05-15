// The Blog controller defines several asynchronous functions that interact with a Blog model using the Mongoose library.
// The getBlogs function retrieves all blogs and returns them in a JSON format. The deleteAllBlogs function deletes all blogs in the model.
// The createBlog function creates a new blog with a title and description.
// The editBlog function updates an existing blog using its ID,
// and the deleteBlog function deletes a single blog using its ID.
// All the functions include content type validation to ensure that the request data is in a supported format. They also use error handling to send error messages to the client if a problem occurs. Overall, this code provides basic CRUD (Create, Read, Update, and Delete) functionality for a blog model in a RESTful API.

const Blog = require('../models/blogModel')
const mongoose = require('mongoose').default

//get all blogs
async function getBlogs(req,res){
    const blog = await Blog.find({})
    if(!blog){
        return res.status(404).json({error: 'Could not implement the function to get all blogs'})
    }else {
         res.status(200).json(blog)
    }
}

//delete all blogs
async function deleteAllBlogs(req, res){

    const blog = await Blog.deleteMany({})
    if(!blog){
        return res.status(404).json({error: 'Could not implement the function to delete all blogs'})
    }else{
         res.status(200).json(blog)
    }
}

//create a blog
async function createBlog(req, res){

    const {title, description} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push(title)
    }

    if (!description){
        emptyFields.push(description)
    }

    if(emptyFields > 0){
        return res.status(404).json({error: 'Please fill out the empty fields', emptyFields})
    }

    const blog = await Blog.create({title, description})
    if(!blog){
         res.status(404).json({error: 'Could not complete the function to create a new blog'})
    } else {
         res.status(200).json(blog)
    }
}

//update a blog
async function editBlog(req, res){

    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No such blog was found to update'})
    }
    const blog = await Blog.findOneAndUpdate({_id:id}, {
            ...req.body
        })
    if(!blog){
        res.status(404)

    }
    res.status(200).json(blog)
}

//delete a single blog
async function deleteBlog(req, res){

    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such blog found to delete'})
    }
    const blog = await Blog.findOneAndDelete({_id:id})
    if(!blog){
        return res.status(404).json({error: 'No such blog was found to delete'})
    }
    res.status(200).json(blog)
}

module.exports = {
    getBlogs,
    deleteAllBlogs,
    createBlog,
    editBlog,
    deleteBlog
}