import React from "react";

const ErrorMessage = ({ message = "" }) => {
  return (
    <div className="authentication-error">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
