// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginAuth from "./LoginAuth";
import Dashboard from "./Dashboard";

// want code every time i access this URL
// windown.location.search -> gives us an object w/ all those info
const code = new URLSearchParams(window.location.search).get("code");

function App() {
    return (
        <div className="App">
            {code ? <Dashboard code={code} /> : <LoginAuth />}
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
        </div>
    );
}

export default App;
