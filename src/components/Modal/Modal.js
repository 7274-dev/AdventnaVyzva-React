import { useTheme } from '../../App';
import '../../styles/Prompt.css';
import '../../styles/Modal.css';

const ShortInput = ({ text, ref }) => {
    // TODO design: add space between inputs

    return (
        <input ref={ ref } defaultValue={ text } className='input' />
    )
}

const LongInput = ({ text, ref }) => {
    return (
        <div ref={ ref } className='input long-input' contentEditable="true">{ text }</div>
    )
}

const Modal = ({ active, finishCallback, children }) => {
    const modalClassName = useTheme('prompt');
    const modalWindowClassName = useTheme('form');

    return (
        <div className={ `${modalClassName} ${active ? 'active' : ''}` }>
            <form className={ modalWindowClassName } onSubmit={(e) => e.preventDefault()}>
                { children }

                <div className='button-container' style={{marginTop: '1rem'}}>
                    <button onClick={() => finishCallback(true)} type='submit'>Ok</button>
                    <button onClick={() => finishCallback(false)} type='submit'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export { Modal, ShortInput, LongInput }
