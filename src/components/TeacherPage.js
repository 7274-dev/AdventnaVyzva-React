import { useState } from 'react';
import { Settings, Setting } from './Settings';
import '../styles/TeacherPage.css';
import '../styles/Settings.css';

const SideBar = ({ token, setCurrentPage, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    const pages = ["Dashboard", "Homework", "Students"];

    return (
        <div className="sidebar-container">
            {
                pages.map((link) => {
                    return (
                        <div className="link-container" onClick={ () => { setCurrentPage(link.toLowerCase()) } }>
                            <h1 className="link">{ link }</h1>
                        </div>
                    )
                })
            }

            <Settings token={ token } className="settings-bottom-left" rotation="top">
                <Setting name="Dark Mode" initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name="Snowflakes" initialValue={ snowFlakes } onChange={ setSnowFlakes } />
            </Settings>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div>
            <h1>
                Dashboard
            </h1>
        </div>
    )
}

const Homework = () => {
    return (
        <div>
            <h1>
                Homework
            </h1>
        </div>
    )
}

const Students = () => {
    return (
        <div>
            <h1>
                Students
            </h1>
        </div>
    )
}

const TeacherPage = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    // TODO: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg
    
    // pretty cluttered in my opinion. it should be simpler  // who wrote this?

    // TODO: add dark mode on this page

    const [currentPage, setCurrentPage] = useState('dashboard');

    return (
        <div className="teacher-page">
            <SideBar setCurrentPage={ setCurrentPage } token={ token }
                     darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowFlakes={ snowFlakes } setSnowFlakes={ setSnowFlakes }
            />

            { currentPage === 'dashboard' && <Dashboard /> }
            { currentPage === 'homework' && <Homework /> }
            { currentPage === 'students' && <Students /> }
        </div>
    )
}

export { TeacherPage };
