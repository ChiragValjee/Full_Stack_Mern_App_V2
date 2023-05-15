// Functional React component that displays a blog page.
// The page fetches all blogs from this api: '/api/blog' and displays them accordingly.
// It also provides functionality to add new blog posts, edit existing blog posts, and delete blog posts.
// It uses useState to maintain state for various variables such as title, description, editTitle, editDescription, iseEditMode, currentEdit, and newAdmin.
// It also uses the useEffect hook to fetch data from the API on page load and updates the page as per the data fetched.
// The code also contains JSX to render the page elements such as forms, buttons, input fields, etc.

import React, {useEffect} from "react";
import {useState} from "react";
import NewAdminForm from "../components/newAdminForm";
import "../AdminBlog.css"

function BlogPage() {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [iseEditMode, setIsEditMode] = useState(false)
    const [currentEdit, setCurrentEdit] = useState("")
    const [newAdmin, setNewAdmin] = useState(false)


// Create a useEffect to display all blog
    useEffect(() => {
        async function getAllBlogs() {
            const response = await fetch('/api/blog')
            const data = await response.json()

            if (response.ok) {
                setBlogs(data)
            }
            const token = localStorage.getItem("adminToken")
            if (!token) {
                window.location.href = "/"
            }
        }

        getAllBlogs()
    }, [blogs])


//create an async function to add a blog

    async function submitBlog(e) {
        e.preventDefault()

        const blog = {title, description}
        const response = await fetch('/api/blog', {
            method: 'POST',
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("adminToken")},
            body: JSON.stringify(blog)
        })
        const data = await response.json()
        if (response.ok) {
            // console.log(`The blog post has been added...... ${data.title ? `title: ${data.title}, ` : ''}${data.description ? `description: ${data.description}` : ''}`)

            // let result = Object.entries(data);

            setTitle("")
            setDescription("")
        }

    }

//function to edit blog post

    async function editBlog(blog) {
        // const editedBlog = {editTitle, editDescription}
        const response = await fetch(`/api/blog/${blog._id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("adminToken")},
            body: JSON.stringify({title: editTitle, description: editDescription})
        })
        if (response.ok) {
            setIsEditMode(false)
        }
    }

//function to delete an individual blog post

    async function deleteBlog(blog) {
        const response = await fetch(`/api/blog/${blog._id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("adminToken")},
        })
        const data = await response.json()
    }

//function to delete all blog posts
    async function deleteAllBlogs() {
        const response = await fetch(`/api/blog`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("adminToken")}
        })
        const data = await response.json()
    }

//Manipulating state to determine which component is rendered when the dit button is clicked
    function editedDetails(blog) {
        setIsEditMode(true)
        setCurrentEdit(blog._id)

    }

//Manipulating state to determine which component is rendered when the dit button is clicked
    function addingUser() {
        setNewAdmin(true)
    }

    function logoutButton(){
        window.location.href = "/"
    }


    return (
        <div className="home">
            <div className="create">
                <button onClick={logoutButton} className="logoutButton">Log Out</button>


                {newAdmin ? (
                    <div>
                        <NewAdminForm newAdmin={newAdmin} setNewAdmin={setNewAdmin}/>
                    </div>
                ) : (
                    <div>
                        <div className="addNewUserButton">
                            <button className="addUserButton" type="button" onClick={addingUser}>Add New Admin</button>
                        </div>
                        <div className="wrapper">
                            <form onSubmit={submitBlog} className="submitForm">
                                <div className="field">

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={160}
                                        placeholder="Add title here"
                                    />
                                </div>
                                <div className="field">

                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        maxLength={500}
                                        placeholder="Add description here"
                                    />
                                </div>
                                <div className="container">
                                    <button type="submit" className="addButton">
                                        Add Blog
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/*--------------------------*/}
                        <div className="delete">
                            <button
                                type="button"
                                className="deleteAllButton"
                                onClick={deleteAllBlogs}
                            >
                                Delete all blog posts
                            </button>
                        </div>
                        {/*--------------------------*/}

                        <div className="blogs">
                            <h1 className="blogSecondHeading">Active Blogs </h1>

                            {blogs &&
                                blogs.length > 0 &&
                                blogs.map((blog) => (
                                    <div key={blog._id}>
                                        <div className="blogDetails">
                                            {iseEditMode && blog._id === currentEdit ? (
                                                <div className="blogEditInput">
                                                    <label>title</label>
                                                    <input
                                                        type="text"
                                                        placeholder={blog.title}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        maxLength={160}
                                                    />

                                                    <label>description</label>
                                                    <input
                                                        type="text"
                                                        placeholder={blog.description}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                        maxLength={500}
                                                    />
                                                    <button
                                                        className="save"
                                                        type="button"
                                                        onClick={() => editBlog(blog)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="cancel"
                                                        type="button"
                                                        onClick={() => setIsEditMode(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="generalBlog">
                                                    <h5>{blog.title}</h5>
                                                    <p>{blog.description}</p>
                                                    <div className="buttons">
                                                        <button
                                                            className="deleteButton"
                                                            type="button"
                                                            onClick={() => deleteBlog(blog)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="editButton"
                                                            type="button"
                                                            onClick={() => editedDetails(blog)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogPage