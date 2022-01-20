import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Shopping from "./Shopping";
import Recipe from "./Recipe";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Shopping />} />
          <Route path="recipes" element={<Recipe />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
