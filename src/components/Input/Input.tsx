import React from "react";

import { IInput } from "./types";

import "./Input.scss";

const Input: React.FC<IInput> = ({ value, placeholder, onChange }) => {
  return (
    <input
      className="input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
