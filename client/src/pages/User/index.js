import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorMessage from "@components/Authentication/ErrorMessage";
import { updatePassword, deleteAccount } from "../../services/Authentication";
import UserContext from "../../context/UserContext";

import "./styles.css";

const User = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [error, setError] = useState({ newPassword: "", passwordCheck: "" });

  const history = useHistory();

  const handleDeleteUser = async () => {
    await deleteAccount(userData.token);

    setUserData({});
    localStorage.removeItem("auth-token");
    history.push("/");
  };

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
    setPassword("");
    setPasswordCheck("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (password.length < 6) {
      errors.newPassword = "Password needs to be at least 6 characters.";
    }
    if (password !== passwordCheck) {
      errors.passwordCheck = "Please enter the new password twice.";
    }
    setError(errors);
    if (Object.keys(errors).length === 0) {
      const updated = await updatePassword({ password }, userData.token);
      if (updated) {
        setPassword("");
        setPasswordCheck("");
        setPasswordUpdated(true);
      }
    }
  };

  return (
    <div className="user">
      <h3>Hello, {userData.user.userName}</h3>
      <div className="user-actions">
        <button className="user-password" onClick={handleChangePassword}>
          {changePassword ? "Hide Change Password" : "Change Password"}
        </button>
        <button className="user-delete" onClick={handleDeleteUser}>
          Delete Account
        </button>
      </div>
      <div className={`user-change-password ${changePassword ? "show" : ""}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-password">New Password</label>
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage message={error.newPassword} />
          <label htmlFor="user-password-check">Re-enter New Password</label>
          <input
            id="user-password-check"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <ErrorMessage message={error.passwordCheck} />
          <input type="submit" />
        </form>
        {passwordUpdated ? <h4>Your password is updated!</h4> : null}
      </div>
    </div>
  );
};

export default User;
