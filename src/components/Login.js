import { useState } from "react";
import * as Api from '../Api';
import "../styles/Login.css";

const Login = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [messageText, setMessageText] = useState("");

    const login = async () => {
        const result = await Api.login(usernameInput, passwordInput)

        if (result) {
            setMessageText('Wrong username or password.');
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h1>{ messageText }</h1>

                <h4>Username:</h4>
                <input placeholder="Jozko Mrkvicka" onChange={ e => setUsernameInput(e.target.value) } />

                <h4>Password:</h4>
                <input placeholder="Heslo123" onChange={ e => setPasswordInput(e.target.value) } />

                <button onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
