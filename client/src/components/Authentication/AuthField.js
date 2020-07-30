import React from "react";
import ErrorMessage from "./ErrorMessage";

const AuthField = ({
  label,
  onChange,
  value,
  type,
  required = false,
  error = "",
}) => {
  return (
    <>
      <label
        htmlFor={`authentication-${label.replace(" ", "").toLowerCase()}`}
        className={required ? "authentication-required" : ""}
      >
        {label}
      </label>
      <input
        id={`authentication-${label.replace(" ", "").toLowerCase()}`}
        type={type}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage message={error} />
    </>
  );
};

export default AuthField;
