import { useRef } from "react";
import cookie from "react-cookies";
import "../styles/Login.css";

const Login = () => {
    const backendUrl = "http://localhost:7274";
    const username = useRef();
    const password = useRef();
    const messageText = useRef();

    const login = () => {
        // TODO: test if this works

        const xml = new XMLHttpRequest();
        xml.open("POST", backendUrl + "/login");
        xml.setRequestHeader("Content-Type", "application/json");

        const data = {
            username: username.current.value,
            password: password.current.value
        };

        xml.onreadystatechange = () => {
            if (xml.readyState === XMLHttpRequest.DONE) {
                if (xml.status === 202) {
                    cookie.save("token", JSON.stringify(xml.response).token);
                    // cookie.load("token", false);
                }
                else if (xml.status === 418) {
                    messageText.current.innerText = "Wrong password.";
                }
            }
        }

        xml.send(JSON.stringify(data));
    }

    return (
        <div className="login-container">
            <div className="login">
                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                <h1 ref={ node => messageText.current = node } />

                <h4>Username:</h4>
                <input placeholder="Jozko Mrkvicka" ref={ node => username.current = node } />

                <h4>Password:</h4>
                <input placeholder="Heslo123" ref={ node => password.current = node } />

                <button onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
