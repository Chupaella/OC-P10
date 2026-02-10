import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearError, fetchProfile, login } from "../features/auth/authSlice";
import Button from "../components/Button";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isLoading = status === "loading";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(login(formData)).unwrap();
      await dispatch(fetchProfile()).unwrap();
      navigate("/profile");
    } catch (submitError) {
      // Error state already stored in Redux.
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Username</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-remember">
          <input id="remember-me" type="checkbox" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <Button className="sign-in-button" type="submit" disabled={isLoading}>
          Sign In
        </Button>
      </form>
      {error && (
        <p role="alert" className="login-error">
          {error}
        </p>
      )}
    </section>
  );
};

export default Login;
