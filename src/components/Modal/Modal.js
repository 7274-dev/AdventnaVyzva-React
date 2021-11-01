import { useTheme } from '../../App';
import '../Prompt/Prompt.css';
import './Modal.css';

const Modal = ({ active, finishCallback, children, additionalClassName = '' }) => {
    const modalClassName = useTheme('prompt');
    const modalWindowClassName = useTheme('form');

    return (
        <div className={ `${modalClassName} ${active ? 'active' : ''} ${additionalClassName}` }>
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

export { Modal }
