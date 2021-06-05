// noinspection JSUnusedLocalSymbols

import { useState, useEffect } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { SnowFlakes } from './SnowFlakes';
import { Settings } from './Settings';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import '../styles/StudentsPage.css';

const StudentsPage = ({ token, getClassNameByTheme, darkMode, setDarkMode }) => {
    // TODO: fix snowflakes colors on light mode
    const [snowFlakes, setSnowFlakes] = useState(useDefaultValue(
        loadCookie('snowflakes') === 'true',
        true
    ));

    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO: add completed homework balls drag'n'drop on tree (with save in cookies)

    // TODO: change colors for dark theme
    const settings = [
        {
            name: "Dark Mode",
            initialValue: darkMode,
            callback: (newValue) => {
                setDarkMode(newValue);  // we dont need to save to cookies, App.js will do it for us
            }
        },
        {
            name: "Snowflakes",
            initialValue: snowFlakes,
            callback: (newValue) => {
                setSnowFlakes(newValue);  // we dont need to save to cookies, code bellow will do it for us
            }
        }
    ]

    useEffect(() => {
        saveCookie("snowflakes", snowFlakes);
    }, [snowFlakes])

    return (
        <div className={ getClassNameByTheme("students-page") }>
            <Settings settings={ settings } token={ token } getClassNameByTheme={ getClassNameByTheme } />

            {
                snowFlakes && <SnowFlakes />
            }

            <div className={ getClassNameByTheme("tree") }>
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
