import { useState, useEffect } from "react";
import SettingsIcon from "../images/settings-button.svg";
import '../styles/Settings.css';

const Slider = ({ onChange, initialValue, index }) => {
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
            setButton(<Slider onChange={ onChange } index={ index } />);
        }
        // eslint-disable-next-line
    }, [type]);

    return (
        <div className="setting">
            <h1 className="setting-name">{ name }</h1>
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

            { popup }
        </div>
    )
}

export { Settings };
