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
            {/* <div className="app__name">
                <h3>Bett!fy</h3>
            </div> */}
            {code ? <Dashboard code={code} /> : <LoginAuth />}
        </div>
    );
}

export default App;
