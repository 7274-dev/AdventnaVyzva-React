// noinspection JSUnusedLocalSymbols

import { Settings } from "./Settings";
import '../styles/StudentsPage.css';

const StudentsPage = ({ token, getClassNameByTheme, darkMode, setDarkMode }) => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO: add completed homework balls drag'n'drop on tree (with save in cookies)
    // TODO: add functionality other settings (snowflakes, logout button...)
    // idea: using useStates

    // TODO: change colors for dark theme
    const settings = [
        {
            name: "Dark Mode",
            initialValue: darkMode,
            callback: (newValue) => {
                setDarkMode(newValue);  // we dont need to save to cookies, App.js will do it for us
                console.log(newValue);
            }
        },
        {
            name: "Snowflakes",
            initialValue: false,
            callback: (newValue) => {
                console.log(newValue);
            }
        }
    ]

    return (
        <div className={ getClassNameByTheme("students-page") }>
            <Settings settings={ settings } token={ token } getClassNameByTheme={ getClassNameByTheme } />

            <div className={ getClassNameByTheme("tree") }>
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
