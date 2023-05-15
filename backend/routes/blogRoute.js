// The blog Route is implementing an Express Router for handling HTTP requests related to a blog.
// It imports the blogController module which contains functions to handle requests such as retrieving, creating, editing, and deleting blog entries.
// The router then defines various routes such as GET, POST, PUT, and DELETE, which map to the corresponding functions in the blogController.
// Finally, it exports the router for use in other modules.

const express = require('express')
const router = express.Router()
const {
    getBlogs,
    deleteAllBlogs,
    createBlog,
    editBlog,
    deleteBlog
} = require('../controllers/blogController')

router.get('/', getBlogs, )
router.post('/', createBlog)
router.delete('/', deleteAllBlogs)
router.delete('/:id', deleteBlog)
router.put('/:id', editBlog)

module.exports = router