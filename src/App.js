import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Shopping from "./Shopping";
import Recipe from "./Recipe";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Shopping />} />
          <Route path="recipes" element={<Recipe />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
