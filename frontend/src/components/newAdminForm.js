// Functional React component form for adding a new admin user.
// It uses the useState hook to manage state variables for name, email, password, and role, and defines an async function to handle form submission.
// The form fields capture user input, and when the form is submitted, a POST request is sent to the "/api/blog/registerAdmin" endpoint with the user input data.
// If the response is successful, the state variables are reset and the component re-renders.
// Finally, the component is exported for use in other parts of the application.

import React, {useState} from "react";
import "../Login.css"

function NewAdminForm({newAdmin, setNewAdmin}) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    async function handleSubmitUser(e) {
        e.preventDefault()
        const response = await fetch('/api/blog/registerAdmin', {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: localStorage.getItem("adminToken")},
            body: JSON.stringify({name, email, password, role})
        })
        const data = response.json()
        console.log(data)

        if (response.ok) {
            console.log("The admin user has been added")
            setName("")
            setEmail("")
            setPassword("")
            setRole("")
            setNewAdmin(false)
            alert("New admin created successfully")

        }
    }

    return (
        <div>
            <div className="wrapper">
                <h2 className="title">Add New Admin</h2>
                <form onSubmit={handleSubmitUser} className="newUserForm">
                    <div className="field">

                        <input
                            type="text"
                            value={name}
                            placeholder="Enter name here"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="field">

                        <input
                            type="email"
                            value={email}
                            placeholder="Enter Email here"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">

                        <input
                            type="password"
                            value={password}
                            placeholder="Enter Password here"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="field">

                        <input
                            type="text"
                            value={role}
                            placeholder="Please enter the word admin to proceed"
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className="container">
                        <button className="loginButton" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewAdminForm