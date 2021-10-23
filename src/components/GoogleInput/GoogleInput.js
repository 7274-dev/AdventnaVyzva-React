import { useTheme } from '../../App';
import './GoogleInput.css';

const GoogleInput = ({ placeholder, onChange }) => {
    const googleInputClassName = useTheme('google-input')

    return (
        <label htmlFor='google-input' className={ googleInputClassName }>
            <input type='text' id='google-input' placeholder='&nbsp;' onChange={(e) => onChange(e.target.value)} />
            <span className='label'>{ placeholder }</span>
            <span className='focus-bg' />
        </label>
    )
}

export { GoogleInput }
