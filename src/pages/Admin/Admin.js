import { useState } from 'react';
import { sha512 } from 'js-sha512';
import '../../styles/Admin.css';  // do we really need Admin.css??
import { localized } from '../../hooks/useLocalization';

const Admin = () => {
    // TODO code: finish this page

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('Type your password:');
    const [passwordInput, setPasswordInput] = useState(undefined);
    const [showPassword, setShowPassword] = useState(false);

    const login = (e) => {
        e.preventDefault();

        const enteredPassword = passwordInput.target.value;

        if (sha512(enteredPassword) === 'fb0ed71ec21c9f4ac68add2abf631ad0e45c1f10ad35aac7bc44869cd40caa69bbf899800d62d6f98b2e2ff19163c446762e11960e1741ef49dbea3da5a72fcb') {
            setIsLoggedIn(true);
        }
        else if (enteredPassword === 'your password') {
            setMessage(localized('admin.wrongPassword1'));
        }
        if (enteredPassword === 'again') {
            setMessage(localized('admin.wrongPassword2'));
        }
        else if (enteredPassword === 'incorrect') {
            setMessage(localized('admin.wrongPassword3'))
        }
        else {
            setMessage(localized('admin.wrongPassword1'));
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='admin-page'>
            { !isLoggedIn &&
            <form className='login' onSubmit={ login }>
                <h1>{ message }</h1>

                <input type={ showPassword ? 'text' : 'password' } onChange={ setPasswordInput } />
                <br />
                <div className='show-password-container'>
                    <input type='checkbox' onClick={ togglePasswordVisibility } />
                    <p>{ localized('show.password') }</p>
                </div>

                <button type='submit'>{ localized('ok') }</button>
            </form> }

            { isLoggedIn &&
            <div className='content'>
            </div> }
        </div>
    )
}

export { Admin }
