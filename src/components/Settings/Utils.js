import { useDefaultValue } from '../../hooks/useDefaultValue';
import { useEffect, useState } from 'react';
import { useTheme } from '../../App';
import { toast } from 'react-toastify';
import { localized } from '../../hooks/useLocalization';

const Switch = ({ onChange, initialValue, name }) => {
    const defaultValue = useDefaultValue(initialValue, false);
    const [value, setValue] = useState(defaultValue);
    const id = `settings-switch-input-${name.toLowerCase().replace(' ', '_')}`;

    const switchClassName = useTheme('settings-switch');
    const switchInputClassName = useTheme('settings-switch-input');
    const switchLabelClassName = useTheme('settings-switch-label');
    const switchSpanClassName = useTheme('settings-switch-span');

    useEffect(() => {
        if (onChange) onChange(value);
    }, [onChange, value]);

    // we have to use these classes here, or else it wont work on firefox-like browsers
    return (
        <div className={ switchClassName }>
            <input id={ id } checked={ value } type='checkbox' className={ switchInputClassName }
                   onChange={e => setValue(e.target.checked)} />
            <label htmlFor={ id } className={ switchLabelClassName }>
                <span className={ switchSpanClassName } />
            </label>
        </div>
    )
}



const HtmlDropdown = ({ values, initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);
    const htmlDropdownClassName = useTheme('setting-dropdown');

    useEffect(() => {
        if (onChange) onChange(value);
    }, [onChange, value]);

    return (
        <select className={ htmlDropdownClassName } onChange={e => setValue(e.target.value)} defaultValue={ initialValue }>
            { values.map((value, index) => <option className='setting-dropdown-item' key={ index } value={ value }>{ value }</option> ) }
        </select>
    )
}

const IntegerInput = ({ initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        let containsLetter = false;
        try {
            for (const letter of value) {
                if (isNaN(parseInt(letter))) {
                    containsLetter = true;
                    break;
                }
            }
        }
        catch (err) {}

        if (isNaN(parseInt(value.toString())) || containsLetter) {
            toast.error(localized('toast.enterNumbersOnly'));
        }

        if (onChange) onChange(parseInt(value.toString()));
    }, [onChange, value]);

    return (
        <input type='text' className='settings-int-input' defaultValue={ initialValue } onChange={e => setValue(e.target.value)} />
    )
}

export {
    Switch, IntegerInput, HtmlDropdown
}
