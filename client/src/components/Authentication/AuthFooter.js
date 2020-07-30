import React from "react";

const AuthFooter = ({ title, actionName, onClick }) => {
  return (
    <div>
      {title}
      <span onClick={onClick} className="authentication-footer-action">
        {actionName}
      </span>
    </div>
  );
};

export default AuthFooter;
