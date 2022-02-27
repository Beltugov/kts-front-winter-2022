import React from "react";

import "./Button.scss";

import { IButton } from "./types";

const Button: React.FC<IButton> = ({
  isDisabled,
  onClick,
  inputValue,
  children,
}) => {
  return (
    <button
      className={"button"}
      disabled={isDisabled}
      onClick={() => onClick(inputValue)}
    >
      {children}
    </button>
  );
};

export default Button;
