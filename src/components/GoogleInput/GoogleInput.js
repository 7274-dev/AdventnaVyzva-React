import { useTheme } from '../../App';
import './GoogleInput.css';

const GoogleInput = ({ placeholder, changeCallback }) => {
    const googleInputClassName = useTheme('google-input')

    return (
        <label htmlFor='google-input' className={ googleInputClassName }>
            <input type='text' id='google-input' placeholder='&nbsp;' onChange={ changeCallback } />
            <span className='label'>{ placeholder }</span>
            <span className='focus-bg' />
        </label>
    )
}

export { GoogleInput }
