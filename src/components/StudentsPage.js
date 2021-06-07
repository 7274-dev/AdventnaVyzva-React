import { useEffect } from 'react';
import { useTheme } from '../App';
import { Settings, Setting } from './Settings';
import { save as saveCookie } from 'react-cookies';
import '../styles/StudentsPage.css';

const StudentsPage = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO code: add completed homework balls drag'n'drop on tree (with save in cookies)

    useEffect(() => {
        saveCookie("snowflakes", snowFlakes);
    }, [snowFlakes]);

    const studentsPageClassName = useTheme("students-page");
    const treeClassName = useTheme("tree");

    return (
        <div className={ studentsPageClassName }>
            <Settings token={ token } className="settings-top-left" rotation="bottom">
                <Setting name="Dark Mode" initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name="Snowflakes" initialValue={ snowFlakes } onChange={ setSnowFlakes } />
            </Settings>

            <div className={ treeClassName }>
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
