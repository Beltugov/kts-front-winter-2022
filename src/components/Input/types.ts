import React from "react";

export interface IInput {
  value: string;
  placeholder: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}
