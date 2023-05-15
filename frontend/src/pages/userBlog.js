// React component called UserBlog that displays a list of blogs retrieved from an API endpoint.
// It uses the useEffect hook to make an HTTP request to the API when the component mounts, and updates the state with the retrieved blogs.
// It also uses the useState hook to declare a blogs state variable that stores the retrieved blogs.
// If the user is not logged in (as indicated by the absence of a JWT token in the local storage),
// they are redirected to the login page.

import {useEffect} from "react";
import {useState} from "react";
import "../UserBlog.css"

function UserBlog() {
    const [blogs, setBlogs] = useState("")

//UseEffect used to retrieve all blogs from the given api
//User unable to perform any crud operations as this is only permitted for admin usage.
    useEffect(() => {
        async function getBlogs() {
            const response = await fetch('/api/blog')
            const data = await response.json()

            if (response.ok) {
                setBlogs(data)
            }
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href = "/"
            }
        }

        getBlogs()
    }, [blogs])

    function logoutButton(){
        window.location.href = "/"
    }

    return (
        <div className="blogs">
            <button onClick={logoutButton} className="logoutButton">Logout</button>
            <div className="heading">
                <h1>Welcome to Porto Rio</h1>
                <h2>We will keep you up to date with the latest news here</h2>
            </div>
            {blogs && blogs.map((blog) => (
                <div key={blog._id} className="blog">
                    <h5 className="title">{blog.title}</h5>
                    <p className="blogInfo">{blog.description}</p>
                </div>
            ))}
        </div>
    )}

export default UserBlog