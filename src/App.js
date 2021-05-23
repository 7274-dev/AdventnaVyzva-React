// TODO: translate everything to SLOVAK language
// TODO: add dark mode to all pages
// noinspection JSUnusedLocalSymbols

import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { load as loadCookie } from 'react-cookies';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { _404 } from "./components/404";
import './styles/Global.css';

const App = () => {
    const [token, setToken] = useState(loadCookie("token"));  // this will return UNDEFINED if its not in cookies
    const [darkMode, setDarkMode] = useState(/*loadCookie("dark-mode") || false*/true);

    // eslint-disable-next-line
    const isLoggedIn = () => {
        return token !== undefined;
    }

    const getClassNameByDarkMode = (normalClassName) => {
        return `${normalClassName} ${darkMode ? `${normalClassName}-dark` : ""}`
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact={ true } render={ routeProps => (
                        <Home isLoggedIn={ true } token={ token } getClassNameByDarkMode={ getClassNameByDarkMode }
                              setDarkMode={ setDarkMode } />
                    )} />

                    <Route path="/login" exact={ true } render={ routeProps => (
                        <Login setToken={ setToken } getClassNameByDarkMode={ getClassNameByDarkMode } />
                    )} />

                    <Route render={ routeProps => (
                        // eslint-disable-next-line
                        <_404 getClassNameByDarkMode={ getClassNameByDarkMode } />
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
