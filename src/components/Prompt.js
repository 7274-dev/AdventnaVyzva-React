import { useState } from 'react';
import { useTheme } from '../App';
import '../styles/Prompt.css';

const Prompt = ({ message, finishCallback }) => {
    const [input, setInput] = useState('');
    const promptClassName = useTheme('prompt');
    const blurClassName = useTheme('blur');
    const promptWindowClassName = useTheme('prompt-window');

    // TODO code, design: add `copy password button`

    return (
        <div className={ promptClassName }>
            <div className={ blurClassName } />

            <div className={ promptWindowClassName }>
                <h1>{ message }</h1>
                <input onChange={e => setInput(e.target.value)} />

                <div className='button-div'>
                    <button onClick={() => finishCallback(input)}>Ok</button>
                    <button onClick={() => finishCallback(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export { Prompt }
