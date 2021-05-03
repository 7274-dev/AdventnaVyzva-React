import { useState } from 'react';
import * as Api from '../Api';
import '../styles/Login.scss';

const Login = ({ token, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async () => {
        console.log({ usernameInput: username, passwordInput: password })
        const result = await Api.login(username, password)

        if (!result) {
            setMessage('Wrong username or password.');
        }
        else {
            setMessage(`You've successfully logged in!`);
            setToken(result);
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h1>{ message }</h1>

                <h4>Username:</h4>
                <input placeholder="Username" onChange={ e => setUsername(e.target.value) } />

                <h4>Password:</h4>
                <input placeholder="Password" onChange={ e => setPassword(e.target.value) } />

                <button onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
