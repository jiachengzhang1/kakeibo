import React from "react";

import "./styles.css";

const ChangeableInput = ({
  onChange,
  label = "",
  value,
  editing,
  name,
  type,
  min = 0,
  step = "any",
  error = "",
}) => {
  const content = editing ? (
    <h1 className="changeable-input-input">
      {label}
      <input
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={onChange}
        type={type}
        name={name}
        defaultValue={value}
        min={min}
        step={step}
      />
      <p className="changeable-input-error">{error}</p>
    </h1>
  ) : (
    <h1>{`${label}${value === undefined ? 0 : value}`}</h1>
  );

  return <div className="changeable-input">{content}</div>;
};

export default ChangeableInput;
