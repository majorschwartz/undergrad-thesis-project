import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateRun from "./components/CreateRun";
import ShowRun from "./components/ShowRun";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<CreateRun />} />
                    <Route path="/run/:run_tag" element={<ShowRun />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
