// TODO: translate everything to SLOVAK language

import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';

function App() {
    const [token, setToken] = useState();

    const isLoggedIn = () => {
        return token !== undefined;
    }

    return (
        <Router>
            <div>
                <Route path="/" exact={ true } render={routeProps => (
                    <Home/>
                )} />

                <Route path="/login" exact={ true } render={routeProps => (
                    <Login token={token} setToken={setToken} />
                )} />
            </div>
        </Router>
    );
}

export { App };
