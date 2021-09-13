import { useState, useEffect } from 'react';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { useTheme } from '../../App';
import { useHistory } from 'react-router-dom';
import '../../styles/TeacherPage/SideBar.css';

const SidebarPC = ({ children }) => {
    const sidebarClassName = useTheme('sidebar-container');

    return (
        <div className={ sidebarClassName }>
            { children }
        </div>
    )
}

const SidebarMobile = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const toggleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        history.listen(() => {
            setShowMenu(false);
        });
    }, [history]);

    const sidebarClassName = useTheme('sidebar-container-mobile', showMenu ? 'active' : '');
    const sidebarIconClassName = useTheme('show-sidebar-icon');

    return (
        <div className={ sidebarClassName }>
            { showMenu && children }

            <div className={ sidebarIconClassName } onClick={ toggleShowMenu } />
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
        <div onClick={() => onClick()} className={ sideBarItemClassName }>
            <div className='icon'>
                { icon }
            </div>

            <h1 className={ nameClassName }>{ name }</h1>
        </div>
    )
}

export { SideBar, SideBarItem };

