import { useState } from "react";
import { save as saveCookie } from 'react-cookies';
import SettingsIcon from "../images/settings-button.svg";
import '../styles/StudentsPage.css';

const Setting = ({ name, type, callback }) => {
    return (
        <div className="setting">
            <h1 className="setting-name">{ name }</h1>

        </div>
    )
}

const Settings = ({ setDarkMode }) => {
    // TODO: add dark mode toggle
    // TODO: add other settings (snowflakes, logout button...)

    const [popup, setPopup] = useState(<div />);
    const [isPopupActive, setIsPopupActive] = useState(false);

    const settings = [
        {
            name: "Dark Mode",
            type: "checkbox",
            callback: (newValue) => {
                saveCookie("dark-mode", newValue);
                setDarkMode(newValue);
            }
        },
        {
            name: "Snowflakes",
            type: "checkbox",
            callback: (newValue) => {
                console.log(newValue);
            }
        }
    ]

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

const StudentsPage = ({ setDarkMode }) => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // idea: maybe change from a tree to something else?
    // it is pretty hard to keep all the 'windows' inside
    // the tree, i think it would be more sensible to make
    // it something else. we should ask the teacher if she
    // doesn't want to rethink this

    return (
        <div className="students-page">
            <Settings setDarkMode={ setDarkMode } />

            <div className="tree">
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
