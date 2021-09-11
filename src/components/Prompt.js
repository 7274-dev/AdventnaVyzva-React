import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../App';
import { localized } from '../hooks/useLocalization';
import CheckBox from 'react-animated-checkbox';
import '../styles/Prompt.css';

const Prompt = ({ message, finishCallback, active, isPassword }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const input = useRef();
    const darkMode = useTheme('').includes('dark');
    const promptClassName = useTheme('prompt');
    const promptWindowClassName = useTheme('form');

    const copyPassword = async () => {
        await navigator.clipboard.writeText(input.current.value);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        // resetting input value
        if (active === true) input.current.value = '';
    }, [active]);

    return (
        <div className={ `${promptClassName} ${active ? 'active' : ''}` }>
            <form onSubmit={(e) => e.preventDefault()} className={ promptWindowClassName }>
                <label htmlFor='password-input'>{ message }</label>

                { !isPassword &&
                    <div className='password-container'>
                        <input id='password-input' ref={ input } />

                        {/* Q: do we want this? */}
                        <button onClick={ copyPassword } type='button'>{ localized('prompt.copy') }</button>
                    </div> }
                { isPassword &&
                    <div>
                        <div className='password-container'>
                            <input id='password-input' type={ isPasswordVisible ? 'text' : 'password' } ref={ input } />
                            {/* Q: do we want this? */}
                            <button onClick={ copyPassword } type='button'>{ localized('prompt.copy') }</button>
                        </div>

                        <div className='toggle-password-visibility'>
                            <CheckBox
                                checked={ isPasswordVisible }
                                checkBoxStyle={{
                                    checkedColor: `#34b93d`,
                                    size: 25,
                                    unCheckedColor: `${ darkMode ? '#e0e0e0' : '#939393' }`
                                }}
                                duration={ 200 }
                                onClick={ togglePasswordVisibility }
                            />
                            <p>{ localized('login.showPassword') }</p>
                        </div>
                    </div> }

                <div className='button-container'>
                    <button onClick={() => finishCallback(input.current.value)} type='submit'>{ localized('prompt.ok') }</button>
                    <button onClick={() => finishCallback(null)} type='button'>{ localized('prompt.cancel') }</button>
                </div>
            </form>
        </div>
    )
}

export { Prompt }
