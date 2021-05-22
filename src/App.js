// TODO: translate everything to SLOVAK language
// TODO: add dark mode

import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { _404 } from "./components/404";
import './styles/Global.css';

function App() {
    const [token, setToken] = useState(undefined);
    const [darkMode, setDarkMode] = useState(true);

    // eslint-disable-next-line
    const isLoggedIn = () => {
        return token !== undefined;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact={ true } render={ routeProps => (
                        <Home isLoggedIn={ true } token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode } />
                    )} />

                    <Route path="/login" exact={ true } render={ routeProps => (
                        <Login setToken={ setToken } darkMode={ darkMode } />
                    )} />

                    <Route render={ routeProps => (
                        // eslint-disable-next-line
                        <_404 darkMode={ darkMode } />
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
