import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../App';
import { localized } from '../../hooks/useLocalization';
import './Prompt.css';

const Prompt = ({ message, finishCallback, active }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const input = useRef();
    const darkMode = useTheme('').includes('dark');
    const promptClassName = useTheme('prompt');
    const promptWindowClassName = useTheme('form');

    const copyPassword = async () => {
        // noinspection JSUnresolvedVariable
        await navigator.clipboard.writeText(input.current.value);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        // resetting input value
        if (active === true) input.current.value = '';
    }, [active]);

    // noinspection JSUnresolvedVariable
    return (
        <div className={ `${promptClassName} ${active ? 'active' : ''}` }>
            <form onSubmit={(e) => e.preventDefault()} className={ promptWindowClassName }>
                <label htmlFor='password-input'>{ message }</label>

                <div className='password-container'>
                    <input id='password-input' ref={ input } />

                    {/* Q: do we want this? yes */}
                    <button onClick={ copyPassword } type='button'>{ localized('prompt.copy') }</button>
                </div>

                <div className='button-container'>
                    <button onClick={() => finishCallback(input.current.value)} type='submit'>{ localized('prompt.ok') }</button>
                    <button onClick={() => finishCallback(null)} type='button'>{ localized('prompt.cancel') }</button>
                </div>
            </form>
        </div>
    )
}

export { Prompt }
