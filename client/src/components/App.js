import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Expenses from "../pages/Expenses";
import Summaries from "../pages/Summaries";

import { Header, Toolbar } from "./Navigation";
import Backdrop from "./Backdrop";

import "./styles.css";

const App = () => {
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

  return (
    <div>
      <Header
        handleToggleOnClick={handleToggleOnClick}
        sideDrawOpen={sideDrawOpen}
      />
      <div className="container-fluid body">
        <Router>
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
            <Route exact path="/">
              <Expenses />
            </Route>
            <Route exact path="/summary">
              <Summaries />
            </Route>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
