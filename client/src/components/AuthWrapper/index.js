import React, { useState, useContext } from "react";
import { Route, useHistory, Redirect } from "react-router-dom";

import Logout from "@pages/Logout";
import User from "@pages/User";
import Expenses from "@pages/Expenses";
import Summaries from "@pages/Summaries";
import Income from "@pages/Income";
import Budgets from "@pages/Budgets";
import About from "@pages/About";

import UserContext from "../../context/UserContext";
import Backdrop from "../Backdrop";
import Authentication from "../Authentication";

import { Header, Toolbar } from "../Navigation";

const AuthWrapper = () => {
  const { userData } = useContext(UserContext);
  const authenticated = userData.user !== undefined;

  const [sideDrawOpen, setSideDrawOpen] = useState(false);

  const handleToggleOnClick = () => {
    setSideDrawOpen((prevState) => {
      return !prevState;
    });
  };
  const handleBackdropOnClick = () => setSideDrawOpen(false);

  const backdrop = sideDrawOpen ? (
    <Backdrop handleBackdropOnClick={handleBackdropOnClick} />
  ) : null;

  const content = authenticated ? (
    <>
      <div className="side-drawer">
        <Toolbar
          show={sideDrawOpen}
          handleToggleOnClick={handleToggleOnClick}
        />
      </div>
      <div className="side-navigation">
        <Toolbar show />
      </div>
      {backdrop}
      <div className="content">
        {/* <Redirect from="/login" to="/" /> */}
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/">
          <Expenses authenticated={authenticated} />
        </Route>
        <Route exact path="/budget">
          <Budgets />
        </Route>
        <Route exact path="/income">
          <Income />
        </Route>
        <Route exact path="/summary">
          <Summaries />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </div>
    </>
  ) : (
    <div className="content auth">
      {/* <Redirect from="/" to="/login" /> */}
      <Route exact path="/">
        <Authentication />
      </Route>
      <Route exact path="/register">
        <Authentication isRegister />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
    </div>
  );

  return (
    <div>
      <Header
        handleToggleOnClick={handleToggleOnClick}
        sideDrawOpen={sideDrawOpen}
      />
      <div className="container-fluid body">{content}</div>
    </div>
  );
};

export default AuthWrapper;
