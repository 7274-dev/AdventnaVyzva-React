import { useState } from 'react';
import { useTheme } from '../App';
import {useDefaultValue} from '../hooks/useDefaultValue';
import { SomethingWentWrong } from './SomethingWentWrong';
import { DelayedRedirect } from './DelayedRedirect';
import CheckBox from 'react-animated-checkbox';
import * as Api from '../Api';
import { ReactComponent as TreeIcon } from '../images/tree.svg';
import '../styles/Login.css';

const Login = ({ token, setToken, darkMode }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [message, setMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // `token !== undefined` can't be here, what if the token is expired?

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
            else if (response.status === 200) {
                setMessage(`You've successfully logged in! Redirecting...`);
                setToken((await response.json()).response);
                setIsLoggedIn(true);
            }
            else {
                setMessage('SomethingWentWrong');
            }
        }
        catch (err) {
            console.log(err)
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

    const queryParams = new URLSearchParams(window.location.search);
    const redirect = useDefaultValue(`/${queryParams.get('redirect')}`, '/');

    if (isLoggedIn) {
        return <DelayedRedirect to={ redirect } timeout={ 1000 } />
    }

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

const LoginRedirect = () => {
    const loginRedirectClassName = useTheme('login-redirect');

    const redirect = `/login?redirect=${window.location.pathname.toString().slice(1)}`;

    return (
        <div className={ loginRedirectClassName }>
            <TreeIcon />
            <h1>You have to log in to use this website!</h1><br/>
            <h1>Redirecting...</h1>
            <DelayedRedirect to={ redirect } delay={ 2500 } />
        </div>
    )
}

export { Login, LoginRedirect };
