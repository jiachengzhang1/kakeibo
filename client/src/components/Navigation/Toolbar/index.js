import React from "react";
import { NavLink } from "react-router-dom";

import "./Toolbar.css";

export const Toolbar = ({ show, handleToggleOnClick }) => {
  const toolbarClasses = show ? "toolbar open" : "toolbar";
  return (
    // <header className="toolbar">
    <nav className={toolbarClasses}>
      <div className="toolbar-navigation-items">
        <ul>
          <li>
            <NavLink to="/" onClick={handleToggleOnClick}>
              <i className="list ul icon"></i>Expenses
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/income" onClick={handleToggleOnClick}>
              <i className="dollar sign icon"></i>Income
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/budget" onClick={handleToggleOnClick}>
              <i className="calculator icon"></i>Budget
            </NavLink>
          </li>
          <li>
            <NavLink to="/summary" onClick={handleToggleOnClick}>
              <i className="file outline icon"></i>Summary
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
    // </header>
  );
};
