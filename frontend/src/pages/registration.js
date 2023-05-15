// Functional React component called Registration which uses React hooks useState to manage the state of name, email and password input fields.
// It sends a POST request to /api/blog/register with the input values when the user submits the registration form,
// and displays a success or failure message accordingly.

import {useState} from "react";
import "../Login.css"

function Registration() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

//Post request which sends the users name, email and password to the backend.
//This information is required for user to use the application.
    async function registration(e) {
        e.preventDefault()
        const response = await fetch('/api/blog/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        })
        const data = await response.json()
        console.log(data)

        if (data === "ok") {
            alert("successfully registered.Please login")
            window.location.href = "/"
        } else {
            alert(`user already exists`)
        }
    }

    return (
        <div className="registration">
            <div className="wrapper">
                <h2 className="title">Register</h2>
                <form className="registrationForm" onSubmit={registration}>
                    <div className="field">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>

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
                        <button className="loginButton" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )}

export default Registration