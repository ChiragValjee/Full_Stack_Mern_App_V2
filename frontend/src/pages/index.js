// React component named Index that contains a login form which allows users to submit their email and password.
// Upon submission, it sends a POST request to a backend API endpoint for user authentication.
// If authentication is successful, it stores the user's token in local storage and redirects them to another page.
// The component also includes buttons for creating an account, admin login, and logging in with Google or Facebook.
// The isAdmin state determines whether to display the login form or the AdminSignIn component.

import {useState} from "react";
import AdminSignIn from "../components/adminSignIn";
import '../Login.css'
import GoogleSignIn from "../components/googleLogin";
import FacebookSignIn from "../components/facebookLogin";

function Index() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

//Post request to submit and verify email and password with db
    async function loginForm(e) {
        e.preventDefault()
        const response = await fetch('/api/blog/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        if (data.user) {
            localStorage.setItem("token", data.user)
            alert("You are successfully logged in, please press ok to proceed")
            window.location.href = "/user-blog"
        } else {
            alert("Incorrect credentials. Try again or contact support")
        }


    }

    function showAdminLogin() {
        setIsAdmin(true)
    }

    function createAccount() {
        window.location.href = "/register"
    }

    return (
        <div className="loginDetails">
            {isAdmin ? (
                <div>
                    <AdminSignIn/>
                </div>) : (
                <div className="wrapper">
                    <h2 className="title">Login</h2>
                    <form onSubmit={loginForm} className="loginForm">
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

                    <div className="facebookGoogleButtons">
                        <div className="googleButton">
                            <GoogleSignIn/>
                        </div>
                        <FacebookSignIn/>
                    </div>

                    <div className="containerTwo">
                        <button className="createAccountButton" type="button" onClick={createAccount}>Create an
                            account
                        </button>
                        <button className="adminLoginButton" type="button" onClick={showAdminLogin}>Admin Login</button>
                    </div>
                </div>)}
            </div>
    )}

export default Index