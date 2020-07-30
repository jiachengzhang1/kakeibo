import React, { useContext } from "react";

import "./Header.css";
import ToggleButton from "./ToggleButton";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";

export const Header = ({ handleToggleOnClick, sideDrawOpen }) => {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const login = () => history.push("/login");
  const logout = () => {
    setUserData({});
    localStorage.setItem("auth-token", "");
    history.push("/logout");
  };
  const register = () => history.push("/register");
  const authLinks = userData.user ? (
    <>
      <button className="header-user" onClick={() => history.push("/user")}>
        😂
      </button>
      <button onClick={logout}>Logout</button>
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
      {/* <h1>kakeibo</h1> */}
      <h3>Expenses Tracker</h3>
      <div className="header-content">
        {authLinks}
        <NavLink to="/about">About</NavLink>
      </div>
    </div>
  );
};
