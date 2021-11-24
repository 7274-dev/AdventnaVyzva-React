import { useState, useEffect } from 'react';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { useTheme } from '../../../App';
import { useHistory } from 'react-router-dom';
import './Sidebar.css';

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
const Sidebar = (props) => {
    const isMobile = useResponsiveValue(false, true);

    // we cant put settings here, cuz it wouldnt work (i tried)
    return (
        <div>
            { isMobile ? <SidebarMobile { ...props } /> : <SidebarPC { ...props } /> }
        </div>
    )
}

export { Sidebar }

