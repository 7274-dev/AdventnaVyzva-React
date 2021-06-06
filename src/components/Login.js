import { useState } from 'react';
import { useTheme } from '../App';
import CheckBox from 'react-animated-checkbox';
import * as Api from '../Api';
import '../styles/Login.css';

const Login = ({ setToken, darkMode }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [message, setMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
        if (!usernameInput.value && passwordInput.value) {
            setMessage("Username can't be empty!");
            return;
        }
        else if (usernameInput && !passwordInput.value) {
            setMessage("Password can't be empty!");
            return;
        }
        else if (!usernameInput && !passwordInput.value) {
            setMessage("Password and username can't be empty!");
            return;
        }

        try {
            const result = await Api.login(usernameInput.value, passwordInput.value);

            // TODO: show better error message
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
            passwordInput.type = "text";
            setShowPassword(true);
        }
        else {
            passwordInput.type = "password";
            setShowPassword(false);
        }
    }

    const loginContainerContainerClassName = useTheme("login-container-container");
    const loginContainerClassName = useTheme("login-container");
    const messageClassName = useTheme("message");
    const inputLabelClassName = useTheme("input-label");
    const inputClassName = useTheme("input");
    const togglePasswordVisibilityContainerClassName = useTheme("toggle-password-visibility-container");

    return (
        <div className={ loginContainerContainerClassName }>
            <div className={ loginContainerClassName }>
                <h3 className={ messageClassName }>{ message }</h3>

                <h4 className={ inputLabelClassName }>Username: </h4>
                <input className={ inputClassName } placeholder="AlbertEinstein69"
                       onChange={ e => setUsernameInput(e.target) } />

                <h4 className={ inputLabelClassName }>Password: </h4>
                <input className={ inputClassName } placeholder="password123" type="password"
                       onChange={ e => { setPasswordInput(e.target); } } />
                <div className={ togglePasswordVisibilityContainerClassName }>
                    <div className="toggle-password-visibility-checkbox">
                        {/* TODO: change colors for both themes */}
                        <CheckBox
                            checked={ showPassword }
                            checkBoxStyle={{
                                checkedColor: `#34b93d`,
                                size: 25,
                                unCheckedColor: `${ darkMode ? "#e0e0e0" : "#939393" }`
                            }}
                            duration={ 200 }
                            onClick={ togglePasswordVisibility }
                        />
                    </div>
                    <p>Show Password</p>
                </div>

                <button className={ useTheme("submit") } onClick={ login }>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
