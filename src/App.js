// TODO: translate everything to SLOVAK language

import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { _404 } from "./components/404";
import './styles/Global.css';

function App() {
    const [token, setToken] = useState(undefined);

    // eslint-disable-next-line
    const isLoggedIn = () => {
        return token !== undefined;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact={ true } render={ routeProps => (
                        <Home isLoggedIn={ true } token={ token } />
                    )} />

                    <Route path="/login" exact={ true } render={ routeProps => (
                        <Login setToken={ setToken } />
                    )} />

                    <Route render={ routeProps => (
                        // eslint-disable-next-line
                        <_404 />
                    )} />

                    {/* if there is no url like that it will redirect to 404 page */}
                    {/*<Redirect to="/404" />*/}

                    {
                        // TODO: make 404 page
                        // TODO: make about page
                    }
                </Switch>
            </div>
        </Router>
    );
}

export { App };
