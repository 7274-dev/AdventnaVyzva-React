import { useTheme } from '../App';
import '../styles/Prompt.css';
import '../styles/Modal.css';

const ShortInput = ({ text, ref }) => {
    return (
        <input ref={ ref } defaultValue={ text } className='short-input' contentEditable={ "true" } />
    )
}

const Modal = ({ active, finishCallback, children }) => {
    const modalClassName = useTheme('prompt');
    const modalWindowClassName = useTheme('prompt-window');

    return (
        <div className={ `${modalClassName} ${active ? 'active' : ''}` }>
            <div className={ modalWindowClassName }>
                { children }

                <div className='button-container' style={{marginTop: '1rem'}}>
                    <button onClick={() => finishCallback(true)}>Ok</button>
                    <button onClick={() => finishCallback(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export { Modal, ShortInput };
