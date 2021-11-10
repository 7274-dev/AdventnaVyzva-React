import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../../App';
import { DelayedRedirect } from '../DelayedRedirect';
import { Switch, HtmlDropdown, IntegerInput } from './Utils';
import { toast } from 'react-toastify';
import * as Api from '../../api';
import { localized, setLang } from '../../hooks/useLocalization';
import { redirectMeTo } from '..';
import { isDefined } from '../../hooks/isDefined';
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
    // TODO code: fix not showing on load sometimes

    const [isPopupActive, setIsPopupActive] = useState(false);

    const logout = async () => {
        if (!['undefined', undefined].includes(token)) {
            await Api.auth.logout(token);

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
    const isDarkMode = useTheme('').includes('-dark');

    useEffect(() => {
        onIsPopupActiveChange(isPopupActive);
    }, [isPopupActive]);

    return (
        <div className={ settingsClassName }>
            <div onClick={ togglePopup } className='settings-icon-container'>
                <img className='settings-icon unselectable' alt={ localized('settings.alt') } draggable={ false } onClick={ togglePopup }
                     src={ isDarkMode ? SettingsIconDark : SettingsIconLight } />
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
    const [updatedSnowflakesCount, setUpdatedSnowflakesCount] = useState(false);

    const additionalSettingsClassName = isActive ? (isTeacherPage ? 'settings-teacher-page active' : 'settings-students-page active') : '';
    const popupRotation = isTeacherPage ? 'top' : 'bottom';

    const excludePaths = ['login', '404', 'serverisdown'];

    const onSettingsCountChange = (value) => {
        if (value === snowflakesCount) {
            return;
        }
        if (value > 1000) {
            toast.error(localized('settings.valueTooHigh'));
            return;
        }

        setSnowflakesCount(value);
        setUpdatedSnowflakesCount(true);
    }

    const locationChangeCallback = (location) => {
        setIsActive(true);

        for (const path of excludePaths) {
            if (location.pathname.toString().includes(path)) {
                setIsActive(false);
            }
        }

        setIsTeacherPage(location.pathname.toString().includes('teacher'));
    }

    const onIsPopupActiveChange = () => {
        if (!updatedSnowflakesCount) {
            return;
        }

        toast.info(localized('settings.reloadRequired'));
        setUpdatedSnowflakesCount(false);
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
            <Setting name={ localized('settings.snowflakesCount') } onChange={ onSettingsCountChange } type='int-input' args={{initialValue: snowflakesCount}} />
            <Setting name={ localized('settings.language') } onChange={ setLang } type='dropdown' args={{initialValue: localStorage.getItem('lang'), values: ['en', 'sk']}} />
        </Settings>
    )
}

export { NormalizedSettings }
