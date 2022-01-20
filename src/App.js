import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TopNav />}>
          <Route index element={<Shopping />} />
          <Route path="recepies" element={<Recepies />} />
        </Route>
      </Routes>
    </div>
  );
}

function TopNav() {
  return (
    <div>
      <MainLink to="/recepies" text="Recepies" />
      <MainLink to="/" text="Shopping" />
      <Outlet />
    </div>
  );
}
function MainLink({ to, text }) {
  return (
    <Link to={to} className="border">
      {text}
    </Link>
  );
}
function Shopping() {
  return (
    <div>
      <h2>Shopping</h2>
    </div>
  );
}

function Recepies() {
  return (
    <div>
      <h2>Recepies</h2>
    </div>
  );
}
export default App;
