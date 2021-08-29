// TODO all: translate everything to SLOVAK language
// TODO management: generate MIT license here: https://license-generator.intm.org/
// TODO code: add some easter eggs
// TODO code: check if there are no semicolons missing
// TODO code: fix performance
// TODO code: rework all inputs to forms if possible
// Q: do we want support/feedback site

import { useState, useEffect } from 'react';
import { useDefaultValue } from './hooks/useDefaultValue';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { TeacherPage } from './components/TeacherPage/TeacherPage';
import { Login } from './components/Login';
import { NotFoundPage } from './components/NotFoundPage';
import { Admin } from './components/Admin';
import { About } from './components/About';
import { ServerIsDown } from './components/ServerIsDown';
import { SnowFlakes } from './components/SnowFlakes';
import { ToastContainer } from 'react-toastify';
import { DelayedRedirect } from './components/DelayedRedirect';
import { NormalizedSettings } from './components/Settings';
import { RedirectContainer } from './components/RedirectMeTo';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import * as Api from './Api';
import './styles/App.css';
import './styles/Global.css';
import 'react-toastify/dist/ReactToastify.css';

let useTheme = (className, additionalClassName = '') => `${className} ${additionalClassName}`;

const App = () => {
    const [token, setToken] = useState(loadCookie('token'));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(useDefaultValue(
        localStorage.getItem('dark-mode') === 'true',
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ));
    const [snowflakes, setSnowflakes] = useState(useDefaultValue(
        localStorage.getItem('snowflakes') === 'true',
        false
    ));

    useTheme = (className, additionalClassName = '') => {
        return `${className} ${darkMode ? `${className}-dark` : ''} ${additionalClassName}`;
    }

    const backgroundClassName = useTheme('background');

    useEffect(() => {
        saveCookie('token', token, {path: '/'});
        localStorage.setItem('snowflakes', snowflakes.toString());
        localStorage.setItem('dark-mode', darkMode.toString());
    }, [darkMode, snowflakes, token]);

    useEffect(() => {
        // checking if token didn't expire
        setInterval(async () => {
            if (!token || token === 'undefined') return;

            const response = await Api.getUserType(token).catch(err => {
                window.location = '/serverisdown';
            });

            if (response.status !== 200) {
                window.location = '/';
            }
        }, 15000);
    }, []);

    return (
        <Router>
            <div className='app'>
                <Switch>
                    <Route path='/' exact>
                        <Home
                            token={ token }
                            setToken={ setToken }
                            darkMode={ darkMode }
                            setDarkMode={ setDarkMode }
                            snowflakes={ snowflakes }
                            setSnowflakes={ setSnowflakes }
                        />
                    </Route>

                    <Route path='/teacher'>
                        <TeacherPage
                            token={ token }
                            setToken={ setToken }
                            darkMode={ darkMode }
                            setDarkMode={ setDarkMode }
                            snowflakes={ snowflakes }
                            setSnowflakes={ setSnowflakes }
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

                <SnowFlakes snowflakes={ snowflakes } />
                <ToastContainer /* docs: https://openbase.com/js/react-toastify */
                    position='top-right'
                    autoClose={ 5000 }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    rtl={ false }
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={ false }
                />
                <NormalizedSettings
                    token={ token }
                    darkMode={ darkMode }
                    setDarkMode={ setDarkMode }
                    snowflakes={ snowflakes }
                    setSnowflakes={ setSnowflakes }
                />
                <div className={ backgroundClassName } />
                <RedirectContainer />
            </div>
        </Router>
    );
}

export { App, useTheme };
