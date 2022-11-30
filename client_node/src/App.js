import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import MapReduce from "./routes/MapReduce";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mapreduce" element={<MapReduce />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
