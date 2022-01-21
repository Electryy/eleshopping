import { Outlet, NavLink } from "react-router-dom";

function MainLayout() {
  return (
    <div className="container max-w-xl mx-auto p-2">
      <Outlet />
      <div className="tabs tabs-boxed fixed bottom-0 left-0 right-0 flex">
        <MainLink to="/" label="Shopping List" />
        <MainLink to="/recipes" label="Recepies" />
      </div>
    </div>
  );
}
function MainLink({ to, label }) {
  const cssClass = "tab tab-lg flex-1 no-underline";
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? `${cssClass} tab-active` : cssClass)}>
      {label}
    </NavLink>
  );
}

export default MainLayout;
