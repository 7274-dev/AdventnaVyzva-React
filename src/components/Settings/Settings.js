import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../App';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Switch, HtmlDropdown, IntegerInput } from './Utils';
import { toast } from 'react-toastify';
import { localized, setLang } from '../../hooks/useLocalization';
import { redirectMeTo } from '..';
import { isDefined } from '../../hooks/isDefined';
import * as Api from '../../api';
import SettingsIconDark from '../../images/settings-dark.png';  // we can't do it any other way
import SettingsIconLight from '../../images/settings-light.png';
import './Settings.css';

const Setting = ({ name, onChange, type, args }) => {
    const settingClassName = useTheme('setting');
    const settingNameClassName = useTheme('setting-name');

    return (
        <div className={ settingClassName }>
            <h1 className={ settingNameClassName }>{ name }</h1>

            { type === 'switch' &&
                <Switch onChange={ onChange } initialValue={ args.initialValue } name={ name } /> }
            { type === 'dropdown' &&
                <HtmlDropdown values={ args.values } initialValue={ args.initialValue } onChange={ onChange } /> }
            { type === 'int-input' &&
                <IntegerInput initialValue={ args.initialValue } onChange={ onChange } /> }
        </div>
    )
}

const Settings = ({ token, children, additionalSettingsClassName, popupRotation, onIsPopupActiveChange }) => {
    const [isPopupActive, setIsPopupActive] = useState(false);

    const logout = async () => {
        if (isDefined(token)) {
            await Api.auth.logout(token);

            setIsPopupActive(false);
            redirectMeTo('/');
        }
    }

    const togglePopup = () => {
        setIsPopupActive(!isPopupActive);
    }

    window.onclick = e => {
        if (!isPopupActive) {
            return;
        }

        let isSettingsChild = false;

        try {
            if (e.target.className.includes('setting') || e.target.id.includes('setting')) {
                isSettingsChild = true;
            }
        }
        catch (err) {}

        try {
            for (const item of e.path) {
                try {
                    if (item.className.includes('setting')) {
                        isSettingsChild = true;
                        break;
                    }
                }
                catch (err) {}
            }
        }
        catch (err) {}

        setIsPopupActive(isSettingsChild);
    }

    const settingsPopupTriangleClassName = useTheme('settings-popup-triangle');
    const settingsPopupClassName = useTheme('settings-popup');
    const logoutButtonClassName = useTheme('settings-logout-button');
    const settingsClassName =useTheme('settings', `${additionalSettingsClassName} ${isPopupActive ? 'popup-active' : ''}`);
    const darkMode = useTheme('').includes('-dark');

    useEffect(() => {
        onIsPopupActiveChange(isPopupActive);
    }, [isPopupActive]);

    return (
        <div className={ settingsClassName }>
            <div onClick={ togglePopup } className='settings-icon-container'>
                <img className='settings-icon unselectable' alt={ localized('settings.alt') } draggable={ false } onClick={ togglePopup }
                     src={ darkMode ? SettingsIconDark : SettingsIconLight } title={ localized('settings.alt') } />
            </div>

            <div className={ `settings-popup-container settings-popup-container-${popupRotation} ${isPopupActive ? 'active' : ''}` }>
                { popupRotation === 'bottom' &&
                    <div className={ settingsPopupTriangleClassName } /> }

                <div className={ settingsPopupClassName }>
                    { children }

                    <div className='settings-logout-button-div'>
                        <button className={ logoutButtonClassName } onClick={ logout }>{ localized('settings.logout') }</button>
                    </div>
                </div>

                { popupRotation === 'top' && <div className={ settingsPopupTriangleClassName } /> }
            </div>
        </div>
    )
}

const NormalizedSettings = ({ token, darkMode, setDarkMode, snowflakes, setSnowflakes, snowflakesCount, setSnowflakesCount }) => {
    const history = useHistory();
    const [isTeacherPage, setIsTeacherPage] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [snowflakeCountBeforeChange, setSnowflakeCountBeforeChange] = useState(snowflakesCount);
    const [updatedSnowflakesCount, setUpdatedSnowflakesCount] = useState(false);
    const [canShowSnowflakeCountToastError, setCanShowSnowflakeCountToastError] = useState(true);

    const additionalSettingsClassName = isActive ? (isTeacherPage ? 'settings-teacher-page active' : 'settings-students-page active') : '';
    const popupRotation = isTeacherPage ? 'top' : 'bottom';
    const isMobile = useResponsiveValue(false, true);

    const excludedPaths = [
        {
            path: '/login',
            forceRender: false
        },
        {
            path: '/404',
            forceRender: false
        },
        {
            path: '/serverisdown',
            forceRender: false
        },
        {
            path: '/about',
            forceRender: false
        },
        {
            path: '/student/homework',
            forceRender: !isMobile
        },
    ];

    const onSnowflakeCountChange = (newSnowflakeCount) => {
        if (newSnowflakeCount === snowflakesCount) {
            return;
        }
        if (newSnowflakeCount > 1000) {
            if (canShowSnowflakeCountToastError) {
                toast.error(localized('settings.valueTooHigh'), {
                    onClose: () => {
                        setCanShowSnowflakeCountToastError(true);
                    }
                });

                setCanShowSnowflakeCountToastError(false);
            }

            return;
        }

        setSnowflakesCount(newSnowflakeCount);
        if (!updatedSnowflakesCount) {
            setUpdatedSnowflakesCount(true);
        }
    }

    const locationChangeCallback = (location) => {
        setIsActive(true);

        for (const excludedPath of excludedPaths) {
            if (location.pathname.toString().startsWith(excludedPath.path) && !excludedPath.forceRender) {
                setIsActive(false);
            }
        }

        setIsTeacherPage(location.pathname.toString().includes('teacher') || location.pathname.toString().includes('admin'));
    }

    const onIsPopupActiveChange = () => {
        if (!updatedSnowflakesCount || snowflakesCount === snowflakeCountBeforeChange) {
            return;
        }

        toast.info(localized('settings.reloadRequired'));
        setUpdatedSnowflakesCount(false);
        setSnowflakeCountBeforeChange(snowflakesCount);
    }

    useEffect(() => {
        locationChangeCallback(window.location);
    }, []);

    useEffect(() => {
        history.listen(locationChangeCallback);
    }, [history]);

    return (
        <Settings token={ token } additionalSettingsClassName={ additionalSettingsClassName } popupRotation={ popupRotation } onIsPopupActiveChange={ onIsPopupActiveChange }>
            <Setting name={ localized('settings.darkMode') } onChange={ setDarkMode } type='switch' args={{initialValue: darkMode}} />
            <Setting name={ localized('settings.snowflakes') } onChange={ setSnowflakes } type='switch' args={{initialValue: snowflakes}} />
            <Setting name={ localized('settings.snowflakesCount') } onChange={ onSnowflakeCountChange } type='int-input' args={{initialValue: snowflakesCount}} />
            <Setting name={ localized('settings.language') } onChange={ setLang } type='dropdown' args={{initialValue: localStorage.getItem('lang'), values: ['en', 'sk']}} />
        </Settings>
    )
}

export { NormalizedSettings }
