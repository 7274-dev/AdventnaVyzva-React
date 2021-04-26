import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

function App() {
    return (
        <Router>
            <div>
                <Route path="/" exact={ true } component={ Home } />
                <Route path="/login" exact={ true } component={ Login } />
            </div>
        </Router>
    );
}

export { App };
