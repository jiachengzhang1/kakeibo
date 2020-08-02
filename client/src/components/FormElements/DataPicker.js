import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

export const DatePickerController = ({ name, control, date }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ onChange, onBlur, value }) => (
        <DatePicker
          onChange={onChange}
          onBlur={onBlur}
          selected={value || !date ? new Date() : new Date(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Choose a date."
        />
      )}
    />
  );
};
