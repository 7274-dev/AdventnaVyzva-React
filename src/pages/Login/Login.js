import { useState } from 'react';
import { useTheme } from '../../App';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import { SomethingWentWrong } from '../../components';
import { DelayedRedirect } from '../../components';
import CheckBox from 'react-animated-checkbox';
import { redirectMeTo } from '../../components';
import { localized } from '../../hooks/useLocalization';
import * as Api from '../../api';
import { ReactComponent as TreeIcon } from '../../images/tree.svg';
import '../../styles/Login.css';

const Login = ({ setToken }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [message, setMessage] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // `token !== undefined` can't be here, what if the token is expired?
    const darkMode = useTheme('').includes('dark');

    const login = async (e) => {
        e.preventDefault();

        if (!usernameInput.value && passwordInput.value) {
            setMessage(localized('login.usernameBlank'));
            return;
        }
        else if (usernameInput && !passwordInput.value) {
            setMessage(localized('login.passwordBlank'));
            return;
        }
        else if (!usernameInput && !passwordInput.value) {
            setMessage(localized('login.usernameAndPasswordBlank'));
            return;
        }

        try {
            setMessage(localized('loading.title'));

            const response = await Api.auth.login(usernameInput.value, passwordInput.value);

            // unauthorized
            if (response.status === 401) {
                setMessage(localized('login.wrongCredentials'));
            }
            else if (response.status === 200) {
                setMessage(localized('login.success'));
                setToken((await response.json()).response);
                setIsLoggedIn(true);
            }
            else {
                setMessage('SomethingWentWrong');
            }
        }
        catch (err) {
            if (err.message === 'Failed to fetch') {
                // Q: do we want to redirect to /serverisdown?
                redirectMeTo('/serverisdown');
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
    const loginContainerClassName = useTheme('form');
    const messageClassName = useTheme('message');
    const inputLabelClassName = useTheme('input-label');
    const inputClassName = useTheme('input');
    const togglePasswordVisibilityContainerClassName = useTheme('toggle-password-visibility-container');
    const submitButtonClassName = useTheme('submit');

    const queryParams = new URLSearchParams(window.location.search);
    const redirect = `/${useDefaultValue(queryParams.get('redirect'), '')}`;

    if (isLoggedIn) {
        return <DelayedRedirect to={ redirect } timeout={ 1000 } />
    }

    return (
        <div className={ loginContainerContainerClassName }>
            <form className={ loginContainerClassName } onSubmit={ login }>
                { message === 'SomethingWentWrong' && <SomethingWentWrong h1FontSize='1.5rem' h2FontSize='1.1rem' h2MarginTop='-1rem' emailMarginTop='-1rem' /> }
                { message !== 'SomethingWentWrong' && <h3 className={ messageClassName }>{ message }</h3> }

                <label className={ inputLabelClassName } htmlFor='username-input'>{ localized('login.username') }:</label>
                <input className={ inputClassName } placeholder='Jozko Mrkvicka'
                       onChange={ e => setUsernameInput(e.target) } id='username-input' />

                <label className={ inputLabelClassName } htmlFor='password-input'>{ localized('login.password') }:</label>
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
                    <p>{ localized('login.showPassword') }</p>
                </div>

                <button className={ submitButtonClassName } type='submit'>
                    <p>{ localized('login.submit') }</p>
                </button>
            </form>
        </div>
    )
}

const LoginRedirect = () => {
    const loginRedirectClassName = useTheme('login-redirect');

    const redirect = window.location.pathname.toString() === '/' ? '/login' : `/login?redirect=${window.location.pathname.toString().slice(1)}`;

    return (
        <div className={ loginRedirectClassName }>
            <TreeIcon />
            <h1>{ localized('loginRedirect.prompt') }</h1><br/>
            <h1>{ localized('loginRedirect.redirect') }</h1>
            <DelayedRedirect to={ redirect } delay={ 3500 } />
        </div>
    )
}

export { Login, LoginRedirect }
