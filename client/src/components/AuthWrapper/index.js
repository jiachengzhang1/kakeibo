import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";

import Expenses from "@pages/Expenses";
import Summaries from "@pages/Summaries";
import Income from "@pages/Income";
import Budgets from "@pages/Budgets";
import About from "@pages/About";

import Backdrop from "../Backdrop";
import Authentication from "../Authentication";

import { Header, Toolbar } from "../Navigation";
import Logout from "@pages/Logout";
import User from "../../pages/User";

const AuthWrapper = ({ authenticated }) => {
  console.log(authenticated);
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
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/">
          <Expenses />
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
      </div>
    </>
  ) : (
    <div className="content auth">
      <Route exact path="/login">
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

  const history = useHistory();
  if (authenticated === false) {
    history.push("/login");
  } else {
    history.push("/");
  }

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
