import React from "react";
import "./Input.scss";

import { IInput } from "./types";

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
