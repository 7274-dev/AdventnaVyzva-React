import { useState } from 'react';
import { useTheme } from '../App';
import '../styles/Prompt.css';

const Prompt = ({ message, finishCallback }) => {
    const [input, setInput] = useState('');
    const promptClassName = useTheme('prompt');
    const blurClassName = useTheme('blur');
    const promptWindowClassName = useTheme('prompt-window');

    const copyPassword = async () => {
        await navigator.clipboard.writeText(input.value);
    }

    return (
        <div className={ promptClassName }>
            <div className={ blurClassName } />

            <div className={ promptWindowClassName }>
                <h1>{ message }</h1>

                <div className='password-container'>
                    <input onChange={e => setInput(e.target)} />
                    <button onClick={ copyPassword }>Copy</button>
                </div>

                <div className='button-container'>
                    <button onClick={() => finishCallback(input.value)}>Ok</button>
                    <button onClick={() => finishCallback(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export { Prompt }
