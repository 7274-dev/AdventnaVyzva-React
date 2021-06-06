/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import * as Api from '../Api';
import SettingsIcon from "../images/settings-button.svg";
import '../styles/Settings.css';

// r/badcode
let switchId = 0;

const Switch = ({ onChange, initialValue, name }) => {
    const [value, setValue] = useState(initialValue || false);

    useEffect(() => {
        // eslint-disable-next-line
        switchId++;
    }, []);

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
            <Switch onChange={ onChange } initialValue={ initialValue } name={ name } useTheme={ useTheme } />
        </div>
    )
}

// TODO: refactor return to children
const Settings = ({ token, children }) => {
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

    return (
        <div className={ useTheme("settings") }>
            <div onClick={ togglePopup }>
                <img className="settings-icon" alt="Settings" src={ SettingsIcon } />
            </div>

            {
                isPopupActive &&
                <div>
                    <div className={ useTheme("settings-popup-triangle") } />
                    <div className={ useTheme("settings-popup") }>

                        {
                            children
                        }

                        <button className={ useTheme("logout-button") } onClick={ logout }>Logout</button>
                    </div>
                </div>
            }
        </div>
    )
}

export { Settings, Setting };
