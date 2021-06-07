// TODO all: translate everything to SLOVAK language
// TODO design: add dark mode to all pages
// TODO code: make dark mode switching more smooth
// TODO management: generate MIT license here: https://license-generator.intm.org/
// TODO graphic: change dashboard, homework and student images

import { useState, useEffect } from 'react';
import { useDefaultValue } from './hooks/useDefaultValue';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { NotFoundPage } from './components/NotFoundPage';
import { About } from './components/About';
import './styles/Global.css';

// got a better idea? write it down here
let useTheme = className => className;

const App = () => {
    const [token, setToken] = useState(loadCookie("token"));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(useDefaultValue(
        loadCookie("dark-mode") === 'true',
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ));
    const [snowFlakes, setSnowFlakes] = useState(useDefaultValue(
        loadCookie('snowflakes') === 'true',
        true
    ));

    useTheme = (className) => {
        return `${className} ${darkMode ? `${className}-dark` : ""}`
    }

    useEffect(() => {
        saveCookie("dark-mode", darkMode);
    }, [darkMode]);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact={ true } render={ routeProps => (
                        <Home
                            token={ token }
                            darkMode={ darkMode }
                            setDarkMode={ setDarkMode }
                            snowFlakes={ snowFlakes }
                            setSnowFlakes={ setSnowFlakes }
                        />
                    )} />

                    <Route path="/login" exact={ true } render={ routeProps => (
                        <Login
                            setToken={ setToken }
                            darkMode={ darkMode }
                        />
                    )} />

                    <Route path="/about" exact={ true } render={ routeProps => (
                        <About />
                    )} />

                    <Route render={ routeProps => (
                        // eslint-disable-next-line
                        <NotFoundPage />
                    )} />
                </Switch>
            </div>
        </Router>
    );
}

export { App, useTheme };
