import { useState } from 'react';
import CheckBox from 'react-animated-checkbox';
import * as Api from '../Api';
import '../styles/Login.css';

const Login = ({ setToken, getClassNameByTheme, darkMode }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
            // TODO: this text doesn't look good on webpage - fix scss
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
            setShowPassword(true);
        }
        else {
            // noinspection JSPrimitiveTypeWrapperUsage
            passwordInput.type = "password";
            setShowPassword(false);
        }
    }

    return (
        <div className={ getClassNameByTheme("login-container-container") }>
            <div className={ getClassNameByTheme("login-container") }>
                <h3 className={ getClassNameByTheme("message") }>{ message }</h3>

                <h4 className={ getClassNameByTheme("input-label") }>Username: </h4>
                <input className={ getClassNameByTheme("input") } placeholder="AlbertEinstein69"
                       onChange={ e => setUsername(e.target.value) } />

                <h4 className={ getClassNameByTheme("input-label") }>Password: </h4>
                <input className={ getClassNameByTheme("input") } placeholder="password123" type="password"
                       onChange={ e => { setPassword(e.target.value); setPasswordInput(e.target); } } />
                <div className={ getClassNameByTheme("toggle-password-visibility-container") }>
                    <div className="toggle-password-visibility-checkbox">
                        {/* TODO: change colors for both themes */}
                        <CheckBox
                            checked={ showPassword }
                            checkBoxStyle={{
                                checkedColor: `#34b93d`,
                                size: 25,
                                unCheckedColor: `${ darkMode ? "#e0e0e0" : "#939393" }`
                            }}
                            duration={ 150 }
                            onClick={ togglePasswordVisibility }
                        />
                    </div>
                    <p>Show Password</p>
                </div>

                <button className={ getClassNameByTheme("submit") } onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
