// React component called AdminSignIn, which handles the form submission for logging in as an admin user.
// The component uses the useState hook to manage the state of the email and password input fields.
// When the form is submitted, a POST request is sent to the server endpoint /api/blog/loginAdmin with the email and password values as JSON.
// The response is then checked for a user object, and if it is present, the adminToken is saved in the browser's localStorage and the user is redirected to the admin-blog page.
// Otherwise, an alert message is displayed indicating invalid credentials.
// The JSX markup defines a form with email and password input fields, and a Login button to submit the form.
// The component exports the AdminSignIn component as the default export, which can be imported and used in other parts of the application.

import {useState} from "react";
// import "./../Login.css"

function AdminSignIn(){
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    async function handleAdminForm(e){
        e.preventDefault()
        const response = await fetch('/api/blog/loginAdmin', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email,password})
        })
        const data = await response.json()

        if (data.user){
            localStorage.setItem("adminToken", data.user)
            alert("You are successfully logged in as an Admin, please press ok to proceed")
            window.location.href = "/admin-blog"
        }else{
            alert("Please check credentials or contact support")
        }
    }

    return(
        <div>
            <div className="wrapper">
                <h2 className="title">Admin Login</h2>
            <form onSubmit={handleAdminForm}>
                <div className="field">
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
                />
                </div>
                <div className="field">
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                </div>
                <div className="container">
                    <button className="loginButton" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
)}

export default AdminSignIn