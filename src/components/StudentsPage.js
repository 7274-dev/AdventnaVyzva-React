// noinspection JSUnusedLocalSymbols

import { useState, useEffect } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { SnowFlakes } from './SnowFlakes';
import { Settings, Setting } from './Settings';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import '../styles/StudentsPage.css';

const StudentsPage = ({ token, useTheme, darkMode, setDarkMode }) => {
    // TODO: fix snowflakes colors on light mode
    const [snowFlakes, setSnowFlakes] = useState(useDefaultValue(
        loadCookie('snowflakes') === 'true',
        true
    ));

    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO: add completed homework balls drag'n'drop on tree (with save in cookies)
    // TODO: change colors for dark theme

    useEffect(() => {
        saveCookie("snowflakes", snowFlakes);
    }, [snowFlakes])

    return (
        <div className={ useTheme("students-page") }>
            <Settings token={ token } useTheme={ useTheme }>
                <Setting name="Dark Mode" initialValue={ darkMode } useTheme={ useTheme } onChange={ setDarkMode } />
                <Setting name="Snowflakes" initialValue={ snowFlakes } useTheme={ useTheme } onChange={ setSnowFlakes } />
            </Settings>

            {
                snowFlakes && <SnowFlakes />
            }

            <div className={ useTheme("tree") }>
                <h1>tree ova here</h1>
            </div>
        </div>
    )
}

export { StudentsPage };
