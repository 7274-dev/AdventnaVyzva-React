import '../Prompt/Prompt.css';
import './Modal.css';

const ShortInput = ({ text, inputRef }) => {
    // TODO design: add space between inputs

    return (
        <input ref={ inputRef } defaultValue={ text } className='input round' />
    )
}

const LongInput = ({ text, inputRef }) => {
    return (
        <div ref={ inputRef } className='input long-input' contentEditable='true'>{ text }</div>
    )
}

export {
    ShortInput, LongInput
}
