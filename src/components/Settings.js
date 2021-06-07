import { useState } from 'react';
import { useTheme } from '../App';
import * as Api from '../Api';
import SettingsIcon from "../images/settings-button.png";
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, name }) => {
    const [value, setValue] = useState(initialValue || false);
    const id = `switch-input-${name.toLowerCase().replace(' ', '_')}`;

    return (
        <div className={ useTheme("switch") }>
            <input id={ id } checked={ value } type="checkbox"
                   onChange={ e => {
                       onChange(e.target.checked);
                       setValue(e.target.checked);
                   } } />
            <label htmlFor={ id }>
                <span />
            </label>
        </div>
    )
}

const Setting = ({ name, initialValue, onChange }) => {
    const settingClassName = useTheme("setting");
    const settingNameClassName = useTheme("setting-name");

    return (
        <div className={ settingClassName }>
            <h1 className={ settingNameClassName }>{ name }</h1>
            <Switch onChange={ onChange } initialValue={ initialValue } name={ name } />
        </div>
    )
}

const Settings = ({ token, children, className, rotation }) => {
    // TODO graphic: make setting icon for white theme

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

        for (let item of e.path) {
            if (item.className && item.className.includes('setting')) {
                isSettingsChild = true;
                break;
            }
        }

        setIsPopupActive(isSettingsChild);
    });

    const settingsPopupTriangleClassName = useTheme("settings-popup-triangle");
    const settingsPopupClassName = useTheme("settings-popup");
    const logoutButtonClassName = useTheme("logout-button");
    const settingsClassName =`${useTheme("settings")} ${className}`;

    return (
        <div className={ settingsClassName }>
            <div onClick={ togglePopup }>
                <img className="settings-icon" alt="Settings" src={ SettingsIcon } draggable={ false } />
            </div>

            {
                isPopupActive &&
                <div className={ `settings-popup-container settings-popup-container-${rotation}` }>
                    {
                        rotation === 'bottom' && <div className={ settingsPopupTriangleClassName } />

                    }

                    <div className={ settingsPopupClassName }>
                        {
                            children
                        }

                        <button className={ logoutButtonClassName } onClick={ logout }>Logout</button>
                    </div>

                    {
                        rotation === 'top' && <div className={ settingsPopupTriangleClassName } />
                    }
                </div>
            }
        </div>
    )
}

export { Settings, Setting };
