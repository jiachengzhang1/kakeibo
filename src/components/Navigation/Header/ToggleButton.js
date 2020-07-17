import React from "react";

import "./ToggleButton.css";

const ToggleButton = ({ handleToggleOnClick, sideDrawOpen }) => {
  const open = sideDrawOpen ? "open" : "";
  return (
    <button className="toggle-button" onClick={handleToggleOnClick}>
      <div className={`toggle-button-line top ${open}`} />
      {/* <div className="toggle-button-line mid" /> */}
      <div className={`toggle-button-line mid ${open}`} />
      <div className={`toggle-button-line bottom ${open}`} />
    </button>
  );
};

export default ToggleButton;
