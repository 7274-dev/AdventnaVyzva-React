// TODO: translate everything to SLOVAK language

import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import './styles/Global.css';

function App() {
    const [token, setToken] = useState(undefined);

    const isLoggedIn = () => {
        return token !== undefined;
    }

    return (
        <Router>
            <div>
                <Route path="/" exact={ true } render={ routeProps => (
                    <Home isLoggedIn={ isLoggedIn() } token={ token } />
                )} />

                <Route path="/login" exact={ true } render={ routeProps => (
                    <Login setToken={ setToken } />
                )} />

                {
                    // TODO: make 404 page
                    // TODO: make about page
                }
            </div>
        </Router>
    );
}

export { App };
