import React from "react";

import { IInput } from "../../types/types";

import "./Input.css";

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
