import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { DelayedRedirect } from './DelayedRedirect';
import * as Api from '../Api';
import SettingsIconDark from '../images/settings-button-dark.png';  // we can't do it any other way
import SettingsIconLight from '../images/settings-button-light.png';
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, name }) => {
    const [value, setValue] = useState(initialValue || false);
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
                   onChange={ e => {
                       setValue(e.target.checked);
                   } } />
            <label htmlFor={ id } className={ switchLabelClassName }>
                <span className={ switchSpanClassName } />
            </label>
        </div>
    )
}

const Setting = ({ name, initialValue, onChange }) => {
    const settingClassName = useTheme('setting');
    const settingNameClassName = useTheme('setting-name');

    return (
        <div className={ settingClassName }>
            <h1 className={ settingNameClassName }>{ name }</h1>
            <Switch onChange={ onChange } initialValue={ initialValue } name={ name } />
        </div>
    )
}

const Settings = ({ token, children, additionalSettingsClassName, popupRotation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupActive, setIsPopupActive] = useState(false);

    const logout = async () => {
        if (!['undefined', undefined].includes(token)) {
            await Api.logout(token);

            if (window.location.pathname.toString() === '/') {
                window.location.reload();
            }
            else {
                setIsLoggedIn(false);
            }
        }
    }

    const togglePopup = () => {
        setIsPopupActive(!isPopupActive);
    }

    window.onclick = (e => {
        if (!isPopupActive) {
            return;
        }

        let isSettingsChild = false;

        try {
            if (e.target.className.includes('setting') || e.target.id.includes('setting')) {
                isSettingsChild = true;
            }
        }
        catch (err) {}

        try {
            for (let item of e.path) {
                try {
                    if (item.className.includes('setting')) {
                        isSettingsChild = true;
                        break;
                    }
                }
                catch (err) {}
            }
        }
        catch (err) {}

        setIsPopupActive(isSettingsChild);
    });

    const settingsPopupTriangleClassName = useTheme('settings-popup-triangle');
    const settingsPopupClassName = useTheme('settings-popup');
    const logoutButtonClassName = useTheme('settings-logout-button');
    const settingsClassName =useTheme('settings', additionalSettingsClassName);
    const isDarkMode = useTheme('').includes('-dark');

    if (!isLoggedIn) {
        return <DelayedRedirect to='/' />
    }

    return (
        <div className={ settingsClassName }>
            <div onClick={ togglePopup } className='settings-icon-container'>
                <img className='settings-icon unselectable' alt='Settings' draggable={ false } onClick={ togglePopup }
                     src={ isDarkMode ? SettingsIconDark : SettingsIconLight } />
            </div>

            <div className={ `settings-popup-container settings-popup-container-${popupRotation} ${isPopupActive ? 'active' : ''}` }>
                {
                    popupRotation === 'bottom' &&
                    <div className={ settingsPopupTriangleClassName } />
                }

                <div className={ settingsPopupClassName }>
                    {
                        children
                    }

                    <div className='settings-logout-button-div'>
                        <button className={ logoutButtonClassName } onClick={ logout }>Logout</button>
                    </div>
                </div>

                {
                    popupRotation === 'top' &&
                    <div className={ settingsPopupTriangleClassName } />
                }
            </div>
        </div>
    )
}

export { Settings, Setting };
