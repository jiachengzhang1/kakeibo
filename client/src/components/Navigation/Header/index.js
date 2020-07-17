import React from "react";

import "./Header.css";
import ToggleButton from "./ToggleButton";

export const Header = ({ handleToggleOnClick, sideDrawOpen }) => {
  return (
    <div className="header">
      <ToggleButton
        handleToggleOnClick={handleToggleOnClick}
        sideDrawOpen={sideDrawOpen}
      />
      <h1>kakeibo</h1>
      <div className="header-content">
        <a>About</a>
      </div>
    </div>
  );
};
