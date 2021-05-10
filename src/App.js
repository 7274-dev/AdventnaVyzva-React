// TODO: translate everything to SLOVAK language

import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import './styles/Global.css';

function App() {
    const [token, setToken] = useState();

    const isLoggedIn = () => {
        return token !== undefined;
    }

    return (
        <Router>
            <div>
                <Route path="/" exact={ true } render={ routeProps => (
                    <Home isLoggedIn={ true } />
                )} />

                <Route path="/login" exact={ true } render={ routeProps => (
                    <Login token={token} setToken={setToken} />
                )} />

                {/* TODO: make 404 page */}
            </div>
        </Router>
    );
}

export { App };
