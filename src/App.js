// TODO all: translate everything to SLOVAK language
// TODO management: generate MIT license here: https://license-generator.intm.org/
// TODO code: add some easter eggs
// TODO code: check if there are no semicolons missing
// idea: add support/feedback site

// TODO code: add token-working checking loop

import { useState, useEffect } from 'react';
import { useDefaultValue } from './hooks/useDefaultValue';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { TeacherPage } from './components/TeacherPage/TeacherPage';
import { Login } from './components/Login';
import { NotFoundPage } from './components/NotFoundPage';
import { Admin } from './components/Admin';
import { About } from './components/About';
import { SnowFlakes } from './components/SnowFlakes';
import { ToastContainer } from 'react-toastify';
import { DelayedRedirect } from './components/DelayedRedirect';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import * as Api from './Api';
import './styles/App.css';
import './styles/Global.css';
import 'react-toastify/dist/ReactToastify.css';

// got a better idea? write it down here
let useTheme = (className, additionalClassName = '') => `${className} ${additionalClassName}`;

const App = () => {
    const [token, setToken] = useState(loadCookie('token'));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(useDefaultValue(
        loadCookie('dark-mode') === 'true',
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ));
    const [snowflakes, setSnowflakes] = useState(useDefaultValue(
        loadCookie('snowflakes') === 'true',
        false
    ));
    const appClassName = useTheme('app');

    useTheme = (className, additionalClassName = '') => {
        return `${className} ${darkMode ? `${className}-dark` : ''} ${additionalClassName}`;
    }

    useEffect(() => {
        saveCookie('token', token, {path: '/'});
        saveCookie('snowflakes', snowflakes.toString(), {path: '/'});
        saveCookie('dark-mode', darkMode.toString(), {path: '/'});
    }, [darkMode, snowflakes, token]);

    useEffect(() => {
        setInterval(async () => {
            if (!token || token === 'undefined') return null;

            try {
                const response = await Api.getUserType(token);

                if (response.status !== 200) {
                    window.location = '/';
                    window.location.reload();
                }
            }
            catch (err) {
                // looks like there is no server, what next?
            }
        }, 15000);
    }, []);

    return (
        <Router>
            <div className={ appClassName }>
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
                            darkMode={ darkMode }
                        />
                    </Route>

                    <Route path='/admin' exact>
                        <Admin />
                    </Route>

                    <Route path='/about' exact>
                        <About />
                    </Route>
                    
                    <Route path='/404' exact>
                        <NotFoundPage />
                    </Route>

                    <Route>
                        <DelayedRedirect to='/404' />
                    </Route>
                </Switch>

                <SnowFlakes snowflakes={ snowflakes } />
                <ToastContainer /* https://openbase.com/js/react-toastify */
                    position="top-right"
                    autoClose={ 5000 }
                    hideProgressBar={ false }
                    newestOnTop={ false }
                    closeOnClick
                    rtl={ false }
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={ false }
                />
            </div>
        </Router>
    );
}

export { App, useTheme };
