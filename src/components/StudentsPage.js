import { useState } from "react";
import SettingsIcon from "../images/settings-button.svg";
import '../styles/StudentsPage.css';

const StudentsPage = () => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // idea: maybe change from a tree to something else?
    // it is pretty hard to keep all the 'windows' inside
    // the tree, i think it would be more sensible to make
    // it something else. we should ask the teacher if she
    // doesn't want to rethink this

    const [popup, setPopup] = useState(<div />);
    const [active, setActive] = useState(false);

    const togglePopup = () => {
        if (active) {
            setPopup(
                <div>
                    <h1>xx</h1>
                </div>
            );
            setActive(false);
        }
        else {
            setPopup(<div />);
            setActive(true);
        }
    }

    return (
        <div className="settings">
            <div onClick={ togglePopup }>
                <img alt="Settings" src={ SettingsIcon } />
            </div>

            { popup }
        </div>
    )
}

export { StudentsPage };
