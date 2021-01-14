import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path={"/"} exact={true} component={ Home } />
      </div>
    </Router>
  );
}

const Home = () => {
  return (
      <h1>Home</h1>
  )
}

export default App;
