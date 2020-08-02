import React, { useContext } from "react";

import "./Header.css";
import ToggleButton from "./ToggleButton";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";

export const Header = ({ handleToggleOnClick, sideDrawOpen }) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const login = () => history.push("/");
  const logout = () => {
    setUserData({});
    localStorage.removeItem("auth-token");
    history.push("/");
  };
  const showAccount = () => history.push("/user");
  const register = () => history.push("/register");
  const authLinks = userData.user ? (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {userData.user.userName}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={showAccount}>
            Account
          </button>
          <button className="dropdown-item" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </>
  );

  const toggleButton = userData.user ? (
    <ToggleButton
      handleToggleOnClick={handleToggleOnClick}
      sideDrawOpen={sideDrawOpen}
    />
  ) : null;

  return (
    <div className="header">
      {toggleButton}
      <h3>ExpTracker</h3>
      <div className="header-content">
        {authLinks}
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
  );
};
