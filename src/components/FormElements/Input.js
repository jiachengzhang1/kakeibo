import React from "react";

export const Input = ({ name, type, defaultValue, register, min, step }) => {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      min={min}
      step={step}
      ref={register({
        required: true,
        message: "This field is required.",
      })}
    />
  );
};
