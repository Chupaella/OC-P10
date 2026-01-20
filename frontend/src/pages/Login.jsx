import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearError, fetchProfile, login } from "../features/auth/authSlice";

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
    <section className="login">
      <h1 className="login-title">Connexion</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-fields">
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Mot de passe</label>
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
        </div>
        <div className="login-actions">
          <button className="sign-in-button" type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
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
