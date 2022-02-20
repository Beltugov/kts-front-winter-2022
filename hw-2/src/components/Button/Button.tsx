import React from "react";

import "./Button.css";

import { IButton } from "../../types/types";

const Button: React.FC<IButton> = ({ isDisabled, children }) => {
  return (
    <button className={"button"} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
