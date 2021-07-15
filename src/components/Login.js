import { useState } from 'react';
import { useTheme } from '../App';
import CheckBox from 'react-animated-checkbox';
import * as Api from '../Api';
import '../styles/Login.css';
import {SomethingWentWrong} from "./SomethingWentWrong";

const Login = ({ setToken, darkMode }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [message, setMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
        if (!usernameInput.value && passwordInput.value) {
            setMessage('Username can\'t be empty!');
            return;
        }
        else if (usernameInput && !passwordInput.value) {
            setMessage('Password can\'t be empty!');
            return;
        }
        else if (!usernameInput && !passwordInput.value) {
            setMessage('Password and username can\'t be empty!');
            return;
        }

        try {
            setMessage('Loading...');

            const response = await Api.login(usernameInput.value, passwordInput.value);

            // unauthorized
            if (response.status === 401) {
                setMessage('Wrong username or password.');
            }
            else {
                setMessage(`You've successfully logged in!`);
                setToken((await response.json()).response);
            }
        }
        catch (err) {
            if (err.message === 'Failed to fetch') {
                setMessage('We couldn\'t reach our servers, make sure you are connected to internet and try again.');
            }
            else {
                setMessage('SomethingWentWrong');
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const loginContainerContainerClassName = useTheme('login-page');
    const loginContainerClassName = useTheme('login-container');
    const messageClassName = useTheme('message');
    const inputLabelClassName = useTheme('input-label');
    const inputClassName = useTheme('input');
    const togglePasswordVisibilityContainerClassName = useTheme('toggle-password-visibility-container');
    const submitButtonClassName = useTheme('submit');

    return (
        <div className={ loginContainerContainerClassName }>
            <div className={ loginContainerClassName }>
                { message === 'SomethingWentWrong' && <SomethingWentWrong h1FontSize='1.5rem' h2FontSize='1.1rem' h2MarginTop='-1rem' emailMarginTop='-1rem' /> }
                { message !== 'SomethingWentWrong' && <h3 className={ messageClassName }>{ message }</h3> }

                <label className={ inputLabelClassName } htmlFor='username-input'>Username:</label>
                <input className={ inputClassName } placeholder='AlbertEinstein69'
                       onChange={ e => setUsernameInput(e.target) } id='username-input' />

                <label className={ inputLabelClassName } htmlFor='password-input'>Password:</label>
                <input className={ inputClassName } placeholder='password123' type={ showPassword ? 'text' : 'password' }
                       onChange={ e => { setPasswordInput(e.target); } } id='password-input' />
                <div className={ togglePasswordVisibilityContainerClassName }>
                    <div className='toggle-password-visibility-checkbox'>
                        <CheckBox
                            checked={ showPassword }
                            checkBoxStyle={{
                                checkedColor: `#34b93d`,
                                size: 25,
                                unCheckedColor: `${ darkMode ? '#e0e0e0' : '#939393' }`
                            }}
                            duration={ 200 }
                            onClick={ togglePasswordVisibility }
                        />
                    </div>
                    <p>Show Password</p>
                </div>

                <button className={ submitButtonClassName } onClick={ login } type='submit'>
                    <p>Log In</p>
                </button>
            </div>
        </div>
    )
}

export { Login };
