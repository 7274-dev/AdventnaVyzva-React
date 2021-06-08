import { Setting, Settings } from "./Settings";
import '../styles/SideBar.css';

// TODO design, code: fix settings icon overflow
const SideBar = ({ token,  darkMode, setDarkMode, snowFlakes, setSnowFlakes, children }) => {
    return (
        <div className="sidebar-container">
            {
                children
            }

            <Settings token={ token } additionalSettingsClassName="settings-teacher-page" popupRotation="top">
                <Setting name="Dark Mode" initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name="Snowflakes" initialValue={ snowFlakes } onChange={ setSnowFlakes } />
            </Settings>
        </div>
    )
}

const SideBarItem = ({ icon, name, onClick }) => {
    return (
        <div onClick={ () => { onClick(name) } } className="sidebar-item">
            <div className="icon">
                { icon }
            </div>

            <h1 className="name">{ name }</h1>
        </div>
    )
}

export { SideBar, SideBarItem };
