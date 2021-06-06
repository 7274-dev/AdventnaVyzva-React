import { useState } from "react";
import { Settings, Setting } from "./Settings";
import "../styles/TeacherPage.css";

const SideBar = ({ token, onLinkClick, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    return (
        <div className="sidebar">
            {
                ["Dashboard", "Homework", "Students"].map((link) => {
                    return (
                        <div className="link-container" onClick={ () => { onLinkClick(link.toLowerCase()) } }>
                            <h1 className="link">{ link }</h1>
                        </div>
                    )
                })
            }

            <Settings token={ token } style={{bottom: '3.5%', left: '1%'}} rotation="top">
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

    const [body, setBody] = useState(<Dashboard />);

    const onLinkClick = (link) => {
        console.log(link);

        switch (link) {
            case 'dashboard':
                setBody(<Dashboard />); break

            case 'homework':
                setBody(<Homework />); break

            case 'students':
                setBody(<Students />); break

            default:
                setBody(<div />); break
        }
    }

    return (
        <div className="teacher-page">
            <SideBar onLinkClick={ onLinkClick } token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowFlakes={ snowFlakes } setSnowFlakes={ setSnowFlakes }
            />

            { body }
        </div>
    )
}

export { TeacherPage };
