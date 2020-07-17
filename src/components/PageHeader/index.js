import React from "react";

const PageHeader = ({ option, icon }) => {
  return (
    <div style={{ marginTop: "20px", marginBottom: "20px", zIndex: "2" }}>
      <h2>
        <i className={`${icon} icon`}></i> {option}
      </h2>
      <hr />
    </div>
  );
};

export default PageHeader;
