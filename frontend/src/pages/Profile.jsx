import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProfile, updateUsername } from "../features/auth/authSlice";

// Comptes placeholder – Phase 1
const ACCOUNTS_PLACEHOLDER = [
  {
    id: "checking",
    title: "Argent Bank Checking (x8349)",
    amount: "$48,098.43",
    description: "Available Balance",
  },
  {
    id: "savings",
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
  },
  {
    id: "credit",
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance",
  },
];

export default function Profile() {
  const dispatch = useAppDispatch();
  const { token, user, status, error } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");

  const isLoading = status === "loading";

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
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserName(user?.userName ?? "");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <main className="main">
        <p className="profile-loading">
          {isLoading ? "Chargement..." : "Profil indisponible."}
        </p>
      </main>
    );
  }

  return (
    <main className="main">
      {/* Header */}
      <div className="header">
        {!isEditing ? (
          <button
            type="button"
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit username
          </button>
        ) : (
          <form className="profile-edit-form" onSubmit={handleSubmit}>
            <div className="profile-edit-fields">
              <div className="input-wrapper">
                <label htmlFor="userName">User name</label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="input-wrapper">
                <label>First name</label>
                <input type="text" value={user.firstName} disabled />
              </div>

              <div className="input-wrapper">
                <label>Last name</label>
                <input type="text" value={user.lastName} disabled />
              </div>

              <div className="profile-edit-actions">
                <button
                  className="edit-button"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button
                  className="edit-button"
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>

              {error && (
                <p role="alert" className="profile-error">
                  {error}
                </p>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Accounts */}
      <h2 className="sr-only">Accounts</h2>

      {ACCOUNTS_PLACEHOLDER.map((account) => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">
              {account.description}
            </p>
          </div>
          <div className="account-content-wrapper cta">
            <button
              className="transaction-button transaction-button--icon"
              type="button"
              onClick={() => alert("Transactions – Phase 2")}
            >
              <span className="sr-only">View transactions</span>
              <svg
                className="chevron-icon"
                width="20"
                height="32"
                viewBox="0 0 20 32"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M2 2L18 16L2 30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}
