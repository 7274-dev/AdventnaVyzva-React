import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../App';
import CheckBox from 'react-animated-checkbox';
import '../styles/Prompt.css';

const Prompt = ({ message, finishCallback, active, isPassword }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const input = useRef();
    const darkMode = useTheme('').includes('dark');
    const promptClassName = useTheme('prompt');
    const promptWindowClassName = useTheme('prompt-window');

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
            <div className={ promptWindowClassName }>
                <h1>{ message }</h1>

                { !isPassword &&
                    <div className='password-container'>
                        <input ref={ input } />

                        {/* Q: do we want this? */}
                        <button onClick={ copyPassword }>Copy</button>
                    </div> }
                { isPassword &&
                    <div>
                        <div className='password-container'>
                            <input type={ isPasswordVisible ? 'text' : 'password' } ref={ input } />
                            {/* Q: do we want this? */}
                            <button onClick={ copyPassword }>Copy</button>
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
                            <p>Show password</p>
                        </div>
                    </div> }

                <div className='button-container'>
                    <button onClick={() => finishCallback(input.current.value)}>Ok</button>
                    <button onClick={() => finishCallback(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export { Prompt }
