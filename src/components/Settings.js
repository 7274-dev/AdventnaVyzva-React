import { useState, useEffect } from "react";
import SettingsIcon from "../images/settings-button.svg";
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, index }) => {
    const [value, setValue] = useState(initialValue || false);

    return (
        <div className="switch">
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

const Setting = ({ name, type, onChange, index }) => {
    const [button, setButton] = useState('');

    useEffect(() => {
        if (type === "checkbox") {
            setButton(<Switch onChange={ onChange } index={ index } />);
        }
        // eslint-disable-next-line
    }, [type]);

    return (
        <div className="setting">
            <h1 className="setting-name">{ name }</h1>
            {/* TODO: fix switch isn't aligned with the text */}
            { button }
        </div>
    )
}

const Settings = ({ settings }) => {
    const [popup, setPopup] = useState(<div />);
    const [isPopupActive, setIsPopupActive] = useState(false);

    const togglePopup = () => {
        if (!isPopupActive) {
            setPopup(
                <div className="settings-popup">
                    {
                        settings.map(setting => {
                            return (
                                <Setting name={ setting.name } type={ setting.type } onChange={ setting.callback }
                                    index={ settings.indexOf(setting) }/>
                            )
                        })
                    }
                </div>
            );
            setIsPopupActive(true);
        }
        else {
            setPopup(<div />);
            setIsPopupActive(false);
        }
    }

    return (
        <div className="settings">
            <div onClick={ togglePopup }>
                <img className="settings-icon" alt="Settings" src={ SettingsIcon } />
            </div>

            {/*
                TODO: add an triangle to popup aiming at the icon,
                sketch: https://discord.com/channels/770229888195493888/833685192249442315/845948725020983297
             */}
            { popup }
        </div>
    )
}

export { Settings };
