import React from "react";

import "./Backdrop.css";

const Backdrop = ({ handleBackdropOnClick }) => {
  return <div className="backdrop" onClick={handleBackdropOnClick}></div>;
};

export default Backdrop;
