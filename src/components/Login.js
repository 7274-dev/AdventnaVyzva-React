import { useState } from "react";
import cookie from "react-cookies";
import "../styles/Login.css";

const Login = () => {
    const backendUrl = "http://localhost:7274";
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [messageText, setMessageText] = useState("");

    const login = async () => {
        // TODO: test if this works

        let response = await fetch(backendUrl + "/login?username=" + usernameInput.value + ",password="
            + passwordInput.value);

        if (response.ok) {
            let json = await response.json();
            cookie.save("token", json.token, []);
            window.location = "/";
        }
        else {
            messageText.innerHTML = "Wrong username or password.";
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h1 ref={ node => setMessageText(node) } />

                <h4>Username:</h4>
                <input placeholder="Jozko Mrkvicka" ref={ node => setUsernameInput(node) } />

                <h4>Password:</h4>
                <input placeholder="Heslo123" ref={ node => setPasswordInput(node) } />

                <button onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
