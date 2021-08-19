import { useEffect, useRef } from 'react';
import { useTheme } from '../App';
import '../styles/Prompt.css';

const Prompt = ({ message, finishCallback, active }) => {
    const input = useRef();
    const promptClassName = useTheme('prompt');
    const promptWindowClassName = useTheme('prompt-window');

    const copyPassword = async () => {
        await navigator.clipboard.writeText(input.current.value);
    }

    useEffect(() => {
        // resetting input value
        if (active === true) input.current.value = '';
    }, [active]);

    return (
        <div className={ `${promptClassName} ${active ? 'active' : ''}` }>
            <div className={ promptWindowClassName }>
                <h1>{ message }</h1>

                <div className='password-container'>
                    {/* maybe change input type to password? */}
                    <input ref={ input } />
                    <button onClick={ copyPassword }>Copy</button>
                </div>

                <div className='button-container'>
                    <button onClick={() => finishCallback(input.current.value)}>Ok</button>
                    <button onClick={() => finishCallback(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export { Prompt }
