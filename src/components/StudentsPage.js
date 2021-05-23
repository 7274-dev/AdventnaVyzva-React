import { Settings } from "./Settings";
import '../styles/StudentsPage.css';

const StudentsPage = ({ setDarkMode }) => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // idea: maybe change from a tree to something else?
    // it is pretty hard to keep all the 'windows' inside
    // the tree, i think it would be more sensible to make
    // it something else. we should ask the teacher if she
    // doesn't want to rethink this

    // TODO: add dark mode toggle
    // TODO: add other settings (snowflakes, logout button...)
    const settings = [
        {
            name: "Dark Mode",
            type: "checkbox",
            callback: (newValue) => {
                // saveCookie("dark-mode", newValue);
                // setDarkMode(newValue);
                console.log(newValue);
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

    return (
        <div className="students-page">
            <Settings settings={ settings } />

            <div className="tree">
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
