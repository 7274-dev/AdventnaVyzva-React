// TODO management: generate MIT license here: https://license-generator.intm.org/
// TODO code: add some easter eggs
// TODO code: check if there are no semicolons missing
// TODO code: fix performance
// TODO code, design: focus on student responsibility
// TODO management: write README
// TODO design: remove all rgba()
// TODO code: refactor all isDarkMode to just darkMode

import { useState, useEffect } from 'react';
import { useDefaultValue } from './hooks/useDefaultValue';
import { useResponsiveValue } from './hooks/useResponsiveValue';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import {
    Home,
    TeacherPage,
    Login,
    NotFoundPage,
    Admin,
    About,
    ServerIsDown,
    Snowflakes,
    DelayedRedirect,
    NormalizedSettings,
    RedirectContainer,
    StudentsPage,
    Homework, redirectMeTo
} from './components';
import { LoginRedirect } from './pages';
import { ToastContainer } from 'react-toastify';
import * as localization from './hooks/useLocalization'; // for readability
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import { isDefined } from './hooks/isDefined';
import * as Api from './api';
import './styles/App.css';
import './styles/Global.css';
import 'react-toastify/dist/ReactToastify.css';

const toastCloseTimeout = 5000;

let useTheme = (className, additionalClassName = '') => `${className} ${additionalClassName}`;
let render = () => {}

const App = () => {
    const [token, setToken] = useState(loadCookie('token'));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(useDefaultValue(
        JSON.parse(localStorage.getItem('dark-mode')),
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ));
    const [snowflakes, setSnowflakes] = useState(useDefaultValue(
        JSON.parse(localStorage.getItem('snowflakes')),
        false
    ));
    const [snowflakesCount, setSnowflakesCount] = useState(useDefaultValue(
        JSON.parse(localStorage.getItem('snowflakes-count')),
        useResponsiveValue(50, 10)
    ));
    const [renderVar, setRenderVar] = useState(false);
    const history = useHistory();

    useTheme = (className, additionalClassName = '') => {
        return `${className} ${darkMode ? `${className}-dark` : ''} ${additionalClassName}`;
    }

    render = () => {
        setRenderVar(!renderVar);
    }

    const backgroundClassName = useTheme('background');

    useEffect(() => {
        if (!isDefined(localStorage.getItem('lang'))) {
            localization.setLang(localization.getDefaultLang());
        }
    }, []);

    useEffect(() => {
        Api.makeAuthenticatedRequest.setSetToken(setToken);
    }, []);

    useEffect(() => {
        if (!isDefined(token)) {
            for (const url of ['/serverisdown', '/login']) {
                if (window.location.pathname.includes(url)) return;
            }

            redirectMeTo(`/`);
        }
    }, [token]);

    useEffect(() => {
        saveCookie('token', token, { path: '/' });
        localStorage.setItem('dark-mode', JSON.stringify(darkMode));
        localStorage.setItem('snowflakes', JSON.stringify(snowflakes));
        localStorage.setItem('snowflakes-count', JSON.stringify(snowflakesCount));
    }, [token, darkMode, snowflakes, snowflakesCount]);

    useEffect(() => {
        setRenderVar(!renderVar);
    }, [history]);

    return (
        <Router>
            <div className='app'>
                <Switch>
                    <Route path='/' exact>
                        <Home
                            token={ token }
                            setToken={ setToken }
                        />
                    </Route>

                    <Route path='/student' exact>
                        <StudentsPage token={ token } />
                    </Route>

                    <Route path='/student/homework/:homeworkId'>
                        <Homework token={ token } />
                    </Route>

                    <Route path='/teacher'>
                        <TeacherPage
                            token={ token }
                            setToken={ setToken }
                        />
                    </Route>

                    <Route path='/login'>
                        <Login
                            setToken={ setToken }
                        />
                    </Route>

                    <Route path='/admin' exact>
                        <Admin />
                    </Route>

                    <Route path='/about' exact>
                        <About />
                    </Route>

                    <Route path='/serverisdown' exact>
                        <ServerIsDown />
                    </Route>

                    <Route path='/404' exact>
                        <NotFoundPage />
                    </Route>

                    <Route>
                        <DelayedRedirect to='/404' />
                    </Route>
                </Switch>

                { ['undefined', undefined].includes(token) && window.location.pathname === '/' && <LoginRedirect /> }

                <Snowflakes
                    snowflakes={ snowflakes }
                    snowflakesCount={ snowflakesCount }
                    darkMode={ darkMode }
                />
                <ToastContainer /* docs: https://openbase.com/js/react-toastify */
                    position='top-right'
                    autoClose={ toastCloseTimeout }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    rtl={ false }
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <NormalizedSettings
                    token={ token }
                    darkMode={ darkMode }
                    setDarkMode={ setDarkMode }
                    snowflakes={ snowflakes }
                    setSnowflakes={ setSnowflakes }
                    snowflakesCount={ snowflakesCount }
                    setSnowflakesCount={ setSnowflakesCount }
                />
                <div className={ backgroundClassName } />
                <RedirectContainer />
            </div>
        </Router>
    );
}

export { App, useTheme, render, toastCloseTimeout }
