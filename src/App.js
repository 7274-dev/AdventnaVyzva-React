// TODO: translate everything to SLOVAK language
// TODO: add dark mode to all pages
// noinspection JSUnusedLocalSymbols

import { useState, useEffect } from 'react';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { _404 } from "./components/404";
import './styles/Global.css';

const App = () => {
    const [token, setToken] = useState(loadCookie("token"));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(/*loadCookie("dark-mode") || false*/true);

    const getClassNameByTheme = (normalClassName) => {
        return `${normalClassName} ${darkMode ? `${normalClassName}-dark` : ""}`
    }

    useEffect(() => {
        setDarkMode(loadCookie("dark-mode") || window.matchMedia("(prefers-color-scheme: dark)").matches);
    },[]);

    useEffect(() => {
        saveCookie("dark-mode", darkMode);
    }, [darkMode]);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact={ true } render={ routeProps => (
                        <Home token={ token } getClassNameByTheme={ getClassNameByTheme }
                              setDarkMode={ setDarkMode } />
                    )} />

                    <Route path="/login" exact={ true } render={ routeProps => (
                        <Login setToken={ setToken } getClassNameByTheme={ getClassNameByTheme } />
                    )} />

                    <Route render={ routeProps => (
                        // eslint-disable-next-line
                        <_404 getClassNameByTheme={ getClassNameByTheme } />
                    )} />

                    {
                        // TODO: make about page
                    }
                </Switch>
            </div>
        </Router>
    );
}

export { App };
