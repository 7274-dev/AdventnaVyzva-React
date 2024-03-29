// guys, this is not my code
// credits to: RandomWikec#9999

import { useEffect, useState } from 'react';
import { useTheme } from '../../App';
import './Dropdown.css';

const Dropdown = ({ values, onSelect, initial }) => {
    const [currentValue, setCurrentValue] = useState(initial);
    const [isPopupActive, setIsPopupActive] = useState(false);

    const toggle = () => {
        setIsPopupActive(!isPopupActive);
    }

    const select = (value) => {
        setCurrentValue(value);
        setIsPopupActive(false);
    }

    useEffect(() => {
        onSelect(currentValue);
    }, [currentValue, onSelect])

    window.onclick = e => {
        if (!isPopupActive) {
            return;
        }

        let isDropdownChild = false;

        try {
            if (e.target.className.includes('dropdown') || e.target.id.includes('dropdown')) {
                isDropdownChild = true;
            }
        }
        catch (err) {}

        try {
            for (const item of e.path) {
                try {
                    if (item.className.includes('dropdown')) {
                        isDropdownChild = true;
                        break;
                    }
                }
                catch (err) {}
            }
        }
        catch (err) {}

        setIsPopupActive(isDropdownChild);
    }

    const dropdownClassName = useTheme('dropdown', isPopupActive ? 'active' : '');
    const dropdownHeadClassName = useTheme('dropdown-head');
    const dropdownSelectedClassName = useTheme('dropdown-selected', 'unselectable');
    const dropdownIconClassName = useTheme('dropdown-icon');
    const dropdownBodyClassName = useTheme('dropdown-body');
    const dropdownItemClassName = useTheme('dropdown-item');

    return (
        <div className={ dropdownClassName }>
            <div className={ dropdownHeadClassName } onClick={ toggle }>
                <div className={ dropdownSelectedClassName }>{ currentValue.value }</div>
                <div className={ dropdownIconClassName } />
            </div>

            <div className={ dropdownBodyClassName }>
                { values.map((value, index) => (
                    <div className={`${dropdownItemClassName} ${currentValue.id === value.id ? 'active' : ''}`} onClick={() => select(value)} key={ index }>
                        { value.value }
                    </div>
                )) }
            </div>
        </div>
    )
}

export { Dropdown }
