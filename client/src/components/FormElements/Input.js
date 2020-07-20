import React from "react";

export const Input = ({
  name,
  type,
  defaultValue,
  register,
  min,
  step,
  onClick = (event) => {
    event.stopPropagation();
  },
}) => {
  return (
    <input
      onClick={onClick}
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
