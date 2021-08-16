import { useState } from 'react';
import '../styles/Prompt.css';

const Prompt = ({ message, finishCallback }) => {
    const [input, setInput] = useState('');

    return (
        <div className='prompt'>
            <div className='blur' />

            <div className='prompt-window'>
                <h1>{ message }</h1>
                <input onChange={e => setInput(e.target.value)} />
                <button onClick={() => finishCallback(input)}>Ok</button>
            </div>
        </div>
    )
}

export { Prompt }
