import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../App';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import { SomethingWentWrong } from '../../components';
import { DelayedRedirect } from '../../components';
import { localized } from '../../hooks/useLocalization';
import * as Api from '../../api';
import { render } from '../../App';
import EyeImageLight from '../../images/eye-light.png';
import EyeImageDark from '../../images/eye-dark.png';
import ClosedEyeImageLight from '../../images/closedeye-light.png';
import ClosedEyeImageDark from '../../images/closedeye-dark.png';
import './Login.css';

const Login = ({ setToken }) => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // `token !== undefined` can't be here, what if the token is expired?
    const [first, setFirst] = useState(true);
    const [isError, setIsError] = useState(false);

    const loginContainerContainerClassName = useTheme('login-page');
    const loginContainerClassName = useTheme('form');
    const messageClassName = useTheme('message', isError ? 'error' : '');
    const inputLabelClassName = useTheme('input-label');
    const inputClassName = useTheme('input');
    const submitButtonClassName = useTheme('submit');
    const darkMode = useTheme('').includes('dark');
    const queryParams = new URLSearchParams(window.location.search);
    const redirect = `/${useDefaultValue(queryParams.get('redirect'), '')}`;

    const login = async (e) => {
        e.preventDefault();

        if (!usernameInputRef.current?.value && passwordInputRef.current?.value) {
            setMessage(localized('login.usernameBlank'));
            setIsError(true);
            return;
        }
        else if (usernameInputRef.current?.value && !passwordInputRef.current?.value) {
            setMessage(localized('login.passwordBlank'));
            setIsError(true);
            return;
        }
        else if (!usernameInputRef.current?.value && !passwordInputRef.current?.value) {
            setMessage(localized('login.usernameAndPasswordBlank'));
            setIsError(true);
            return;
        }

        setIsError(false);

        try {
            setMessage(localized('loading.title'));

            const response = await Api.auth.login(usernameInputRef.current?.value, passwordInputRef.current?.value);

            if (response.status === 401) {
                setMessage(localized('login.wrongCredentials'));
                setIsError(true);
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
            alert(err);
            // setMessage('SomethingWentWrong');
            setMessage(`FUCKIN BULLSHIT MAN ${err}`);
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
                { message === 'SomethingWentWrong' && <SomethingWentWrong h1FontSize='1.5rem' h2FontSize='1.1rem' emailMarginTop='-1rem' /> }
                { message !== 'SomethingWentWrong' && <h3 className={ messageClassName }>{ message }</h3> }

                <div className='input-container'>
                    <label className={ inputLabelClassName } htmlFor='username-input'>{ localized('login.username') }:</label>
                    <input className={ inputClassName } placeholder='Jozko Mrkvicka' ref={ usernameInputRef } id='username-input' />
                </div>

                <div className='password-container input-container'>
                    <label className={ inputLabelClassName } htmlFor='password-input'>{ localized('login.password') }:</label>
                    <input className={ inputClassName } placeholder='password123' type={ showPassword ? 'text' : 'password' } ref={ passwordInputRef } id='password-input' />
                    <img src={ showPassword ? (darkMode ? ClosedEyeImageDark : ClosedEyeImageLight) : (darkMode ? EyeImageDark : EyeImageLight) } alt='dummy text' title='dummy text' onClick={ togglePasswordVisibility } className='show-password' />
                </div>

                <button className={ submitButtonClassName } type='submit'>{ localized('login.submit') }</button>
            </form>
        </div>
    )
}

export { Login }
