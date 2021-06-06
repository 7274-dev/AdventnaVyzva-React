/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react';
import { useTheme } from '../App';
import * as Api from '../Api';
import SettingsIcon from "../images/settings-button.png";
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, name }) => {
    const [value, setValue] = useState(initialValue || false);

    return (
        <div className={ useTheme("switch") }>
            <input id={ `switch-input-${name.toLowerCase().replace(' ', '_')}` } checked={ value } type="checkbox"
                   onChange={ e => {
                       onChange(e.target.checked);
                       setValue(e.target.checked);
                   } } />
            <label htmlFor={ `switch-input-${name.toLowerCase().replace(' ', '_')}` }>
                <span />
            </label>
        </div>
    )
}

const Setting = ({ name, initialValue, onChange }) => {
    return (
        <div className={ useTheme("setting") }>
            <h1 className={ useTheme("setting-name") }>{ name }</h1>
            <Switch onChange={ onChange } initialValue={ initialValue } name={ name } />
        </div>
    )
}

const Settings = ({ token, children, style, rotation }) => {
    // TODO: make setting icon for white theme

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

    // r/badcode
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

    return (
        <div className={ useTheme("settings") } style={{...style}}>
            <div onClick={ togglePopup }>
                <img className="settings-icon" alt="Settings" src={ SettingsIcon } draggable={ false } />
            </div>

            {
                isPopupActive &&
                <div className={ `settings-popup-container settings-popup-container-${rotation}` }>
                    {
                        rotation === 'bottom' && <div className={ useTheme("settings-popup-triangle") } />

                    }

                    <div className={ useTheme("settings-popup") }>
                        {
                            children
                        }

                        <button className={ useTheme("logout-button") } onClick={ logout }>Logout</button>
                    </div>

                    {
                        rotation === 'top' && <div className={ useTheme("settings-popup-triangle") } />
                    }
                </div>
            }
        </div>
    )
}

export { Settings, Setting };
