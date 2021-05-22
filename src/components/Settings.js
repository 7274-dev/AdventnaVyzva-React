import { useState, useEffect } from "react";
import SettingsIcon from "../images/settings-button.svg";
import '../styles/Settings.css';

const Slider = ({ callback, initialValue }) => {
    const [value, setValue] = useState(initialValue || false);

    const onChange = (e) => {
        callback(e.target.checked);
        setValue(e.target.checked);
    }

    return (
        <div className="switch">
            <input id={ `switch-input` } checked={ value } type="checkbox"
                   onChange={ onChange } />
            <label htmlFor={ `switch-input` }>
                <span />
            </label>
        </div>
    )
}

const Setting = ({ name, type, callback }) => {
    const [button, setButton] = useState('');

    useEffect(() => {
        if (type === "checkbox") {
            setButton(<Slider callback={ callback } />);
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
                                <Setting name={ setting.name } type={ setting.type } callback={ setting.callback } />
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
