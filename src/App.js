// TODO: translate everything to SLOVAK language
// TODO: add dark mode to all pages
// TODO: generate MIT license here: https://license-generator.intm.org/

// idea: maybe refactor Api, useDefaultValue to utils directory??

import { useState, useEffect } from 'react';
import { useDefaultValue } from './hooks/useDefaultValue';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { _404 } from './components/404';
import { About } from './components/About';
import './styles/Global.css';

const App = () => {
    const [token, setToken] = useState(loadCookie("token"));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(useDefaultValue(
        loadCookie("dark-mode") === 'true',
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ));

    const getClassNameByTheme = (normalClassName) => {
        return `${normalClassName} ${darkMode ? `${normalClassName}-dark` : ""}`
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
                            getClassNameByTheme={ getClassNameByTheme }
                            darkMode={ darkMode }
                            setDarkMode={ setDarkMode }
                        />
                    )} />

                    <Route path="/login" exact={ true } render={ routeProps => (
                        <Login
                            setToken={ setToken }
                            getClassNameByTheme={ getClassNameByTheme }
                            darkMode={ darkMode }
                        />
                    )} />

                    <Route path="/about" exact={ true } render={ routeProps => (
                        <About />
                    )} />

                    <Route render={ routeProps => (
                        // eslint-disable-next-line
                        <_404
                            getClassNameByTheme={ getClassNameByTheme }
                        />
                    )} />
                </Switch>
            </div>
        </Router>
    );
}

export { App };
