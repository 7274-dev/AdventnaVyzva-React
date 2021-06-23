import { Setting, Settings } from './Settings';
import '../styles/SideBar.css';
import { useEffect, useState } from 'react';
import { ReactComponent as MenuIcon } from '../images/menu.svg';

const SideBar = ({ token,  darkMode, setDarkMode, snowFlakes, setSnowFlakes, children, currentPage }) => {
    // TODO design, code: fix svgs get smaller on hover
    // TODO design: fix sidebar on smaller devices

    const isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    const [isMenuShown, setIsMenuShown] = useState(false);

    const toggleMenuShown = () => {
        setIsMenuShown(!isMenuShown);
    }

    useEffect(() => {
        if (isMenuShown) {
            setIsMenuShown(false);
        }
    }, [currentPage, isMenuShown]);
    
    if (!isMobile) {
        return (
            <div className='sidebar-container'>
                {
                    children
                }
    
                <Settings token={ token } additionalSettingsClassName='settings-teacher-page' popupRotation='top'>
                    <Setting name='Dark Mode' initialValue={ darkMode } onChange={ setDarkMode } />
                    <Setting name='Snowflakes' initialValue={ snowFlakes } onChange={ setSnowFlakes } />
                </Settings>
            </div>
        );
    }
    else {
        return (
            <div className={`sidebar-container-mobile${isMenuShown ? '-extended' : ''}`}>
                <MenuIcon className='menu-icon' onClick={ toggleMenuShown } />

                { isMenuShown && children }

                <Settings token={ token } additionalSettingsClassName='settings-teacher-page' popupRotation='top'>
                    <Setting name='Dark Mode' initialValue={ darkMode } onChange={ setDarkMode } />
                    <Setting name='Snowflakes' initialValue={ snowFlakes } onChange={ setSnowFlakes } />
                </Settings>

            </div>
        );
    }
}

const SideBarItem = ({ icon, name, onClick }) => {
    return (
        <div onClick={ () => { onClick(name) } } className='sidebar-item'>
            <div className='icon'>
                { icon }
            </div>

            <h1 className='name'>{ name }</h1>
        </div>
    )
}

export { SideBar, SideBarItem };
