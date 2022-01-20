import { Outlet, Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Outlet />
      <MainLink to="/recipes" text="Recepies" />
      <MainLink to="/" text="Shopping" />
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

export default NavBar;
