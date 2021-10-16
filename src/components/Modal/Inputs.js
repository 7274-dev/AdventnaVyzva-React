import '../Prompt/Prompt.css';
import './Modal.css';

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

export {
    ShortInput, LongInput
}
