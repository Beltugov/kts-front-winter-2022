import React from "react";

import { RepoItem } from "../store/GitHubStore/types";

export interface IInput {
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IButton {
  isDisabled: boolean;
}

export interface IRepoTile {
  item: RepoItem;
  onClick: (e: React.MouseEvent) => void;
}

export interface IAvatar {
  src?: string;
  alt: string;
  letter: string;
}
