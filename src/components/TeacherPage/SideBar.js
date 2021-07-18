import { useState, useEffect } from 'react';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { useTheme } from '../../App';
import { useHistory } from 'react-router-dom';
import { Setting, Settings } from '../Settings';
import '../../styles/TeacherPage/SideBar.css';

const SidebarPC = ({ token,  darkMode, setDarkMode, snowflakes, setSnowflakes, children }) => {
    const sidebarClassName = useTheme('sidebar-container');

    return (
        <div className={ sidebarClassName }>
            { children }

            <Settings token={ token } additionalSettingsClassName='settings-teacher-page' popupRotation='top'>
                <Setting name='Dark Mode' initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name='Snowflakes' initialValue={ snowflakes } onChange={ setSnowflakes } />
            </Settings>
        </div>
    )
}

const SidebarMobile = ({ token,  darkMode, setDarkMode, snowflakes, setSnowflakes, children }) => {
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const sidebarClassName = useTheme('sidebar-container-mobile', showMenu ? 'active' : '');

    useEffect(() => {
        history.listen(location => {
            setShowMenu(false);
        });
    }, [history]);

    return (
        <div className={ sidebarClassName }>
            { showMenu && children }
            <div className='show-sidebar-icon' onClick={ toggleShowMenu } />

            <Settings token={ token } additionalSettingsClassName='settings-teacher-page' popupRotation='top'>
                <Setting name='Dark Mode' initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name='Snowflakes' initialValue={ snowflakes } onChange={ setSnowflakes } />
            </Settings>
        </div>
    )
}

// we dont need to use any props here, only thing we want to do with them is to pass on children Sidebar element
const SideBar = (props) => {
    const isMobile = useResponsiveValue(false, true, true);

    // we cant put settings here, cuz it wouldnt work (i tried)
    return (
        <div>
            { isMobile ? <SidebarMobile { ...props } /> : <SidebarPC { ...props } /> }
        </div>
    )
}

const SideBarItem = ({ icon, name, onClick }) => {
    const sideBarItemClassName = useTheme('sidebar-item');
    const nameClassName = useTheme('name');

    return (
        <div onClick={ () => { onClick(name) } } className={ sideBarItemClassName }>
            <div className='icon'>
                { icon }
            </div>

            <h1 className={ nameClassName }>{ name }</h1>
        </div>
    )
}

export { SideBar, SideBarItem };
