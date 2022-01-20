import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Outlet />
      <div class="fixed bottom-0 left-0 right-0 flex">
        <MainLink to="/" label="Shopping List" />
        <MainLink to="/recipes" label="Recepies" />
      </div>
    </div>
  );
}
function MainLink({ to, label }) {
  return (
    <Link to={to} className="border flex-1 p-2 md:p-5">
      {label}
    </Link>
  );
}

export default MainLayout;
