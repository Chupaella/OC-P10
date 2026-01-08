import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProfile, updateUsername } from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { token, user, status, error } = useAppSelector((state) => state.auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user?.userName) {
      setUserName(user.userName);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(updateUsername(userName));
  };

  if (!user) {
    return <p>{status === "loading" ? "Chargement..." : "Profil indisponible."}</p>;
  }

  return (
    <section>
      <h1>Profil</h1>
      <div>
        <p>
          <strong>Prenom:</strong> {user.firstName}
        </p>
        <p>
          <strong>Nom:</strong> {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            id="userName"
            name="userName"
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Mise a jour..." : "Mettre a jour"}
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
};

export default Profile;
