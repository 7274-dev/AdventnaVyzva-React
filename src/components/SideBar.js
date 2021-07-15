import { useEffect, useState } from 'react';
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { useTheme } from '../App';
import { Setting, Settings } from './Settings';
import DarkMenuIcon from '../images/menu-dark.png';
import LightMenuIcon from '../images/menu-light.png';
import '../styles/SideBar.css';

const SideBar = ({ token,  darkMode, setDarkMode, snowFlakes, setSnowFlakes, children, currentPage }) => {
    // TODO design: fix sidebar on smaller devices
    // TODO design: add dark mode to mobile
    // TODO code: fix sidebar doesn't work on mobile

    const isMobile = useResponsiveValue(false, true);
    const [isMenuShown, setIsMenuShown] = useState(false);

    const toggleMenuShown = () => {
        setIsMenuShown(!isMenuShown);
    }

    useEffect(() => {
        if (isMenuShown) {
            setIsMenuShown(false);
        }
    }, [currentPage, isMenuShown]);

    const sideBarClassName = useTheme(isMobile ? `sidebar-container-mobile${isMenuShown ? '-extended' : ''}` : 'sidebar-container');

    return (
        <div className={ sideBarClassName }>
            { isMobile && <img alt='Menu icon' onClick={ toggleMenuShown }
                               src={ sideBarClassName.includes('dark') ? DarkMenuIcon : LightMenuIcon } /> }

            { !isMobile && children }
            { isMobile && isMenuShown && children }

            <Settings token={ token } additionalSettingsClassName='settings-teacher-page' popupRotation='top'>
                <Setting name='Dark Mode' initialValue={ darkMode } onChange={ setDarkMode } />
                <Setting name='Snowflakes' initialValue={ snowFlakes } onChange={ setSnowFlakes } />
            </Settings>
        </div>
    )
}

const SideBarItem = ({ icon, name, onClick }) => {
    const sideBarItemClassName = useTheme('sidebar-item');
    const iconClassName = useTheme('icon');
    const nameClassName = useTheme('name');

    return (
        <div onClick={ () => { onClick(name) } } className={ sideBarItemClassName }>
            <div className={ iconClassName }>
                { icon }
            </div>

            <h1 className={ nameClassName }>{ name }</h1>
        </div>
    )
}

export { SideBar, SideBarItem };
