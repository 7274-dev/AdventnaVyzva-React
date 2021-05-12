import { useState } from "react";
import SettingsIcon from "../images/settings-button.svg";
import '../styles/StudentsPage.css';

const Settings = () => {
    const [popup, setPopup] = useState(<div />);
    const [active, setActive] = useState(false);

    const togglePopup = () => {
        if (!active) {
            setPopup(
                <div className="settings-popup">
                    <h1>xx</h1>
                </div>
            );
            setActive(true);
        }
        else {
            setPopup(<div />);
            setActive(false);
        }
    }

    return (
        <div className="settings">
            <div onClick={ () => { togglePopup(); } }>
                <img alt="Settings" src={ SettingsIcon } />
            </div>

            { popup }
        </div>
    )
}

const StudentsPage = () => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // idea: maybe change from a tree to something else?
    // it is pretty hard to keep all the 'windows' inside
    // the tree, i think it would be more sensible to make
    // it something else. we should ask the teacher if she
    // doesn't want to rethink this

    return (
        <div className="students-page">
            <Settings />

            <div className="tree">
                <h1>tree btw</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
