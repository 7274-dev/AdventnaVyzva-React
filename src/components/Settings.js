import { useState } from 'react';
import { useTheme } from '../App';
import * as Api from '../Api';
import SettingsIconDark from '../images/settings-button-dark.png';  // we can't do it any other way
import SettingsIconLight from '../images/settings-button-light.png';
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, name }) => {
    const [value, setValue] = useState(initialValue || false);
    const id = `settings-switch-input-${name.toLowerCase().replace(' ', '_')}`;

    const switchClassName = useTheme('settings-switch');

    // we have to use these classes here, or else it wont work on firefox-like browsers
    return (
        <div className={ switchClassName }>
            <input id={ id } checked={ value } type='checkbox'
                   onChange={ e => {
                       onChange(e.target.checked);
                       setValue(e.target.checked);
                   } } />
            <label htmlFor={ id } className='settings-switch-label'>
                <span className='settings-switch-span' />
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
    const [isPopupActive, setIsPopupActive] = useState(false);

    const logout = () => {
        if (token !== undefined) {
            // noinspection JSIgnoredPromiseFromCall
            Api.logout(token);
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
            console.log(e)
            for (let item of e.path) {
                try {
                    console.log(item)
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
    const settingsClassName =`${useTheme('settings')} ${additionalSettingsClassName}`;
    const isDarkMode = useTheme('').includes('-dark');

    return (
        <div className={ settingsClassName }>
            <div onClick={ togglePopup } className='settings-icon-container'>
                <img className='settings-icon unselectable' alt='Settings' draggable={ false } onClick={ togglePopup }
                     src={ isDarkMode ? SettingsIconDark : SettingsIconLight } />
            </div>

            {
                isPopupActive &&
                <div className={ `settings-popup-container settings-popup-container-${popupRotation}` }>
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
            }
        </div>
    )
}

export { Settings, Setting };
