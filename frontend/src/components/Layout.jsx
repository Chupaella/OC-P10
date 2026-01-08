import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          {" | "}
          {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
          {isAuthenticated && (
            <>
              <NavLink to="/profile">Profile</NavLink>
              {" "}
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
