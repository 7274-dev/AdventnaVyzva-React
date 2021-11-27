// TODO code: add some easter eggs
// TODO code: check if there are no semicolons missing
// TODO code: fix performance
// TODO code, design: focus on student responsibility
// TODO management: write README

import { useState, useEffect } from 'react';
import { useDefaultValue } from './hooks/useDefaultValue';
import { useResponsiveValue } from './hooks/useResponsiveValue';
import { useBrowserDarkMode } from './hooks/useBrowserDarkMode';
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
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { ToastContainer } from 'react-toastify';
import { LoginRedirect } from './pages';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import { isDefined } from './hooks/isDefined';
import * as Api from './api';
import * as localization from './hooks/useLocalization';
import './styles/App.css';
import './styles/Global.css';
import 'react-toastify/dist/ReactToastify.css';

let useTheme = (className, additionalClassName = '') => `${className} ${additionalClassName}`;
let render = () => {}

const App = () => {
    const [token, setToken] = useState(loadCookie('token'));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(useDefaultValue(
        JSON.parse(localStorage.getItem('dark-mode')),
        useBrowserDarkMode()
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
    const backend = useResponsiveValue(HTML5Backend, TouchBackend);
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
                if (window.location.pathname.toString().startsWith(url)) return;
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
        <DndProvider backend={ backend }>
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
                            <Admin
                                token={ token }
                            />
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
    
                    { !isDefined(token) && window.location.pathname === '/' && <LoginRedirect /> }
    
                    <Snowflakes
                        snowflakes={ snowflakes }
                        snowflakesCount={ snowflakesCount }
                        darkMode={ darkMode }
                    />
                    <ToastContainer /* docs: https://openbase.com/js/react-toastify */
                        position='top-right'
                        autoClose={ 5000 }
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
        </DndProvider>
    )
}

export { App, useTheme, render }
