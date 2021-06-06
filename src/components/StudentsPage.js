import { useEffect } from 'react';
import { useTheme } from '../App';
import { Settings, Setting } from './Settings';
import { save as saveCookie } from 'react-cookies';
import '../styles/StudentsPage.css';

const StudentsPage = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO: add completed homework balls drag'n'drop on tree (with save in cookies)
    // TODO: change colors for dark theme

    useEffect(() => {
        saveCookie("snowflakes", snowFlakes);
    }, [snowFlakes])

    return (
        <div className={ useTheme("students-page") }>
            <Settings token={ token } style={{top: "2%", left: "1.3%"}} rotation="bottom">
                <Setting name="Dark Mode" initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name="Snowflakes" initialValue={ snowFlakes } onChange={ setSnowFlakes } />
            </Settings>

            <div className={ useTheme("tree") }>
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
