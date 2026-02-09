import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import Button from "./Button";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);
  const userName = useAppSelector((state) => state.auth.user?.userName);
  const isAuthenticated = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div>
        {!isAuthenticated ? (
          <NavLink className="main-nav-item main-nav-item-signin" to="/login">
            <i className="fa-solid fa-user" aria-hidden="true"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink className="main-nav-item main-nav-item-profile" to="/profile">
              <span className="main-nav-item-text">{userName || "Profile"}</span>
              <span className="main-nav-item-icon" aria-hidden="true">
                <i className="fa-solid fa-user"></i>
              </span>
            </NavLink>

            <NavLink
              className="main-nav-item main-nav-item-icon"
              to="/profile"
              aria-label="Settings"
              title="Settings"
            >
              <i className="fa-solid fa-gear" aria-hidden="true"></i>
            </NavLink>

            <Button
              type="button"
              className="main-nav-item main-nav-item-button main-nav-item-icon"
              onClick={handleLogout}
              aria-label="Sign out"
              title="Sign out"
            >
              <i className="fa-solid fa-power-off" aria-hidden="true"></i>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
