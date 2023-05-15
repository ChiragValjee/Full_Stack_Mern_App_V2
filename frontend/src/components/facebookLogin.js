// The component is used to handle Facebook authentication.
// When a user logs in with Facebook, it sends a POST request to "/api/blog/facebookLogin" with the user's email.
// If the email already exists in the database, the user is redirected to "/user-blog", and if not, the user is informed that their Facebook account is not registered.
// The component also renders a Facebook login button with the specified appId, fields, callback, icon, size, and width.

// import axios from "axios";
import FacebookLogin from "react-facebook-login";
import "../Login.css"

function FacebookSignIn() {
    const responseFacebook = (response) => {
        console.log(response)
        axios({
            method: "POST",
            url: "/api/blog/facebookLogin",
            data: {username: response.email}
        }).then(response => {
                if (response.data.existingUser) {
                    localStorage.setItem("token", response.data.existingUser)
                    alert("facebook login successful")
                    window.location.href = '/user-blog'
                } else {
                    alert("your facebook account is not registered as a user")
                }
            }
        )
    }
    return (
        <div>
            <FacebookLogin
                appId="199754669497226"
                fields="name, email"
                autoLoad={false}
                callback={responseFacebook}
                icon="fa-facebook"
                size="small"
                width={"40%"}
            />
        </div>
    )
}

export default FacebookSignIn
