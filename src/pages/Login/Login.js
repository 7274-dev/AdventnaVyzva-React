import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../App';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import { SomethingWentWrong } from '../../components';
import { DelayedRedirect } from '../../components';
import { localized } from '../../hooks/useLocalization';
import * as Api from '../../api';
import { render } from '../../App';
import EyeImage from '../../images/eye.png';
import EyeClosedImage from '../../images/eye-closed.png';
import './Login.css';

const Login = ({ setToken }) => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // `token !== undefined` can't be here, what if the token is expired?
    const [first, setFirst] = useState(true);
    const darkMode = useTheme('').includes('dark');

    const loginContainerContainerClassName = useTheme('login-page');
    const loginContainerClassName = useTheme('form');
    const messageClassName = useTheme('message');
    const inputLabelClassName = useTheme('input-label');
    const inputClassName = useTheme('input');
    const submitButtonClassName = useTheme('submit');
    const queryParams = new URLSearchParams(window.location.search);
    const redirect = `/${useDefaultValue(queryParams.get('redirect'), '')}`;

    const login = async (e) => {
        e.preventDefault();

        if (!usernameInputRef.current?.value && passwordInputRef.current?.value) {
            setMessage(localized('login.usernameBlank'));
            return;
        }
        else if (usernameInputRef.current?.value && !passwordInputRef.current?.value) {
            setMessage(localized('login.passwordBlank'));
            return;
        }
        else if (!usernameInputRef.current?.value && !passwordInputRef.current?.value) {
            setMessage(localized('login.usernameAndPasswordBlank'));
            return;
        }

        try {
            setMessage(localized('loading.title'));

            const response = await Api.auth.login(usernameInputRef.current?.value, passwordInputRef.current?.value);

            if (response.status === 401) {
                setMessage(localized('login.wrongCredentials'));
                return;
            }

            if (response.status === 200) {
                setMessage(localized('login.success'));
                setToken((await response.json()).response);
                setIsLoggedIn(true);
                return;
            }

            setMessage('SomethingWentWrong');
        }
        catch (err) {
            setMessage('SomethingWentWrong');
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (first) {
            render();
            setFirst(false);
        }
    }, [first]);

    if (isLoggedIn) {
        return <DelayedRedirect to={ redirect } timeout={ 1000 } />
    }
    return (
        <div className={ loginContainerContainerClassName }>
            <form className={ loginContainerClassName } onSubmit={ login }>
                { message === 'SomethingWentWrong' && <SomethingWentWrong h1FontSize='1.5rem' h2FontSize='1.1rem' h2MarginTop='-1rem' emailMarginTop='-1rem' /> }
                { message !== 'SomethingWentWrong' && <h3 className={ messageClassName }>{ message }</h3> }

                <label className={ inputLabelClassName } htmlFor='username-input'>{ localized('login.username') }:</label>
                <input className={ inputClassName } placeholder='Jozko Mrkvicka' ref={ usernameInputRef } id='username-input' />

                <label className={ inputLabelClassName } htmlFor='password-input'>{ localized('login.password') }:</label>
                <input className={ inputClassName } placeholder='password123' type={ showPassword ? 'text' : 'password' } ref={ passwordInputRef } id='password-input' />

                <img src={ showPassword ? EyeClosedImage : EyeImage } alt='dummy text' title='dummy text' onClick={ togglePasswordVisibility } className='show-password' />

                <button className={ submitButtonClassName } type='submit'>
                    <p>{ localized('login.submit') }</p>
                </button>
            </form>
        </div>
    )
}

export { Login }
