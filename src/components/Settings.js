import { useState } from "react";
import * as Api from '../Api';
import SettingsIcon from "../images/settings-button.svg";
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, index, getClassNameByTheme }) => {
    const [value, setValue] = useState(initialValue || false);

    return (
        <div className={ getClassNameByTheme("switch") }>
            <input id={ `switch-input-${index}` } checked={ value } type="checkbox"
                   onChange={ e => {
                       onChange(e.target.checked);
                       setValue(e.target.checked);
                   } } />
            <label htmlFor={ `switch-input-${index}` }>
                <span />
            </label>
        </div>
    )
}

const Setting = ({ name, initialValue, onChange, index, getClassNameByTheme }) => {
    return (
        <div className={ getClassNameByTheme("setting") }>
            <h1 className={ getClassNameByTheme("setting-name") }>{ name }</h1>
            <Switch onChange={ onChange } initialValue={ initialValue } index={ index }
                    getClassNameByTheme={ getClassNameByTheme } />
        </div>
    )
}

const Settings = ({ settings, token, getClassNameByTheme }) => {
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

    return (
        <div className={ getClassNameByTheme("settings") }>
            <div onClick={ togglePopup }>
                <img className="settings-icon" alt="Settings" src={ SettingsIcon } />
            </div>

            {/*
                TODO: maybe delete border under triangle?
             */}
            {/*
                TODO: add OnClickSomewhereElseHideSetting feature
            */}

            {
                isPopupActive &&
                <div>
                    <div className={ getClassNameByTheme("settings-popup-triangle") } />
                    <div className={ getClassNameByTheme("settings-popup") }>

                        {
                            settings.map(setting => {
                                return (
                                    <Setting name={ setting.name } onChange={ setting.callback }
                                             index={ settings.indexOf(setting) } initialValue={ setting.initialValue }
                                             getClassNameByTheme={ getClassNameByTheme } />
                                )
                            })
                        }

                        <button className={ getClassNameByTheme("logout-button") } onClick={ logout }>Logout</button>
                    </div>
                </div>
            }
        </div>
    )
}

export { Settings };
