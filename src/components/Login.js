import { useState } from 'react';
import * as Api from '../Api';
import '../styles/Login.css';

const Login = ({ setToken, darkMode }) => {
    // TODO: add dark mode to login

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const login = async () => {
        console.log({ usernameInput: username, passwordInput: password });
        if (!username && password) {
            setMessage("Username can't be empty!");
            return;
        }
        else if (username && !password) {
            setMessage("Password can't be empty!");
            return;
        }
        else if (!username && !password) {
            setMessage("Password and username can't be empty!");
            return;
        }

        try {
            const result = await Api.login(username, password);

            if (!result) {
                setMessage('Wrong username or password.');
            }
            else {
                setMessage(`You've successfully logged in!`);
                setToken(result);
            }
        }
        catch (err) {
            setMessage("We couldn't reach our servers, make sure you are connected to internet and try again.");
        }
    }

    const togglePasswordVisibility = () => {
        if (!passwordInput) {
            return;
        }

        if (passwordInput.type === "password") {
            // noinspection JSPrimitiveTypeWrapperUsage
            passwordInput.type = "text";
        }
        else {
            // noinspection JSPrimitiveTypeWrapperUsage
            passwordInput.type = "password";
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h3 className="message">{ message }</h3>

                <h4 className="input-label">Username: </h4>
                <input className="input" placeholder="AlbertEinstein69" onChange={ e => setUsername(e.target.value) } />

                <h4 className="input-label">Password: </h4>
                {
                    // TODO: style password show button
                }
                <button className="show-password-button" onClick={ togglePasswordVisibility }>test</button>
                <input className="input" placeholder="password123" type="password" onChange={ e => {
                    setPassword(e.target.value); setPasswordInput(e.target); } } />

                <button className="submit" onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
