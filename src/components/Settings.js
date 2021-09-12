import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '../App';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { DelayedRedirect } from './DelayedRedirect';
import { toast } from 'react-toastify';
import * as Api from '../api';
import { render } from '../App';
import { localized, setDefaultLang } from '../hooks/useLocalization';
import SettingsIconDark from '../images/settings-button-dark.png';  // we can't do it any other way
import SettingsIconLight from '../images/settings-button-light.png';
import '../styles/Settings.css';

const Switch = ({ onChange, initialValue, name }) => {
    const defaultValue = useDefaultValue(initialValue, false);
    const [value, setValue] = useState(defaultValue);
    const id = `settings-switch-input-${name.toLowerCase().replace(' ', '_')}`;

    const switchClassName = useTheme('settings-switch');
    const switchInputClassName = useTheme('settings-switch-input');
    const switchLabelClassName = useTheme('settings-switch-label');
    const switchSpanClassName = useTheme('settings-switch-span');

    useEffect(() => {
        if (onChange) onChange(value);
    }, [onChange, value]);

    // we have to use these classes here, or else it wont work on firefox-like browsers
    return (
        <div className={ switchClassName }>
            <input id={ id } checked={ value } type='checkbox' className={ switchInputClassName }
                   onChange={e => setValue(e.target.checked)} />
            <label htmlFor={ id } className={ switchLabelClassName }>
                <span className={ switchSpanClassName } />
            </label>
        </div>
    )
}

const HtmlDropdown = ({ values, initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
	    if (onChange) onChange(value);
    }, [onChange, value]);

    return (
        <select className='setting-dropdown' onChange={e => setValue(e.target.value)} defaultValue={ initialValue }>
	        { values.map((val, i) => <option className='setting-dropdown-item' key={ i } value={ val }>{ val }</option> ) }
	    </select>
    )
}

const IntegerInput = ({ initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        let containsLetter = false;
        try {
            for (const letter of value) {
                if (isNaN(parseInt(letter))) {
                    containsLetter = true;
                    break;
                }
            }
        }
        catch (err) {}

        if (isNaN(parseInt(value.toString())) || containsLetter) {
            toast.error(localized('toast.enterNumbersOnly'));
        }

        if (onChange) onChange(parseInt(value.toString()));
    }, [onChange, value]);

    return (
        <input type='text' className='settings-int-input' defaultValue={ initialValue } onChange={e => setValue(e.target.value)} />
    )
}

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

const Settings = ({ token, children, additionalSettingsClassName, popupRotation }) => {
    // TODO design: fix responsibility (only not working on homework section)

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isPopupActive, setIsPopupActive] = useState(false);

    const logout = async () => {
        if (!['undefined', undefined].includes(token)) {
            await Api.auth.logout(token);

            if (window.location.pathname.toString() === '/') {
                window.location.reload();
            }
            else {
                setIsLoggedIn(false);
            }
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
    };

    const settingsPopupTriangleClassName = useTheme('settings-popup-triangle');
    const settingsPopupClassName = useTheme('settings-popup');
    const logoutButtonClassName = useTheme('settings-logout-button');
    const settingsClassName =useTheme('settings', additionalSettingsClassName);
    const isDarkMode = useTheme('').includes('-dark');

    if (!isLoggedIn) {
        return <DelayedRedirect to='/' />
    }

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

    const additionalSettingsClassName = isActive ? (isTeacherPage ? 'settings-teacher-page active' : 'settings-students-page active') : '';
    const popupRotation = isTeacherPage ? 'top' : 'bottom';

    const excludePaths = ['login', '404', 'serverisdown'];

    const onSettingsCountChange = value => {
        // TODO code: this is a lot of spam sometimes - fix

        if (value !== snowflakesCount) {
            toast.info(localized('settings.reloadRequired'));
            setSnowflakesCount(value);
        }
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

    useEffect(() => {
        locationChangeCallback(window.location);
    }, []);

    useEffect(() => {
        history.listen(locationChangeCallback);
    }, [history]);

    return (
        <Settings token={ token } additionalSettingsClassName={ additionalSettingsClassName } popupRotation={ popupRotation }>
            <Setting name={ localized('settings.darkMode') } onChange={ setDarkMode } type='switch' args={{initialValue: darkMode}} />
            <Setting name={ localized('settings.snowflakes') } onChange={ setSnowflakes } type='switch' args={{initialValue: snowflakes}} />
            <Setting name={ localized('settings.snowflakesCount') } onChange={ onSettingsCountChange } type='int-input' args={{initialValue: snowflakesCount}} />
            <Setting name={ localized('settings.language') } onChange={ setDefaultLang } type='dropdown' args={{initialValue: localStorage.getItem('lang'), values: ['en', 'sk']}} />
        </Settings>
    )
}

export { NormalizedSettings };
