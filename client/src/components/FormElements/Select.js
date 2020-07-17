import React from "react";

export const Select = ({ name, options, register, defaultValue }) => {
  const optionsHTML = options.map(({ key, value, text }) => (
    <option key={key} value={value}>
      {text}
    </option>
  ));
  return (
    <select
      name={name}
      ref={register({ required: true, message: "This field is required" })}
      defaultValue={defaultValue}
    >
      {optionsHTML}
    </select>
  );
};
