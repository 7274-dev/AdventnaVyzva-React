// TODO all: translate everything to SLOVAK language
// TODO management: generate MIT license here: https://license-generator.intm.org/
// TODO code: add some easter eggs
// TODO code: check if there are no semicolons missing
// idea: add support/feedback site

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
import { DelayedRedirect } from './components/DelayedRedirect';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import './styles/App.css';
import './styles/Global.css';

// got a better idea? write it down here
let useTheme = className => className;

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

    useTheme = (className, additionalClassName = '') => {
        return `${className} ${darkMode ? `${className}-dark` : ''} ${additionalClassName}`;
    }

    useEffect(() => {
        saveCookie('token', token, {path: '/'});
        saveCookie('snowflakes', snowflakes.toString(), {path: '/'});
        saveCookie('dark-mode', darkMode.toString(), {path: '/'});
    }, [darkMode, snowflakes, token]);

    const appClassName = useTheme('app');

    return (
        <Router>
            <div className={ appClassName }>
                <Switch>
                    <Route path='/' exact={ true }>
                        <Home
                            token={ token }
                            setToken={ setToken }
                            darkMode={ darkMode }
                            setDarkMode={ setDarkMode }
                            snowflakes={ snowflakes }
                            setSnowflakes={ setSnowflakes }
                        />
                    </Route>

                    <Route path='/teacher' exact={ false }>
                        <TeacherPage
                            token={ token }
                            setToken={ setToken }
                            darkMode={ darkMode }
                            setDarkMode={ setDarkMode }
                            snowflakes={ snowflakes }
                            setSnowflakes={ setSnowflakes }
                        />
                    </Route>

                    <Route path='/login' exact={ false }>
                        <Login
                            setToken={ setToken }
                            darkMode={ darkMode }
                        />
                    </Route>

                    <Route path='/admin' exact={ true }>
                        <Admin />
                    </Route>

                    <Route path='/about' exact={ true }>
                        <About />
                    </Route>
                    
                    <Route path='/404' exact={ true }>
                        <NotFoundPage />
                    </Route>

                    <Route>
                        <DelayedRedirect to='/404' />
                    </Route>
                </Switch>

                <SnowFlakes snowflakes={ snowflakes } />
            </div>
        </Router>
    );
}

export { App, useTheme };
