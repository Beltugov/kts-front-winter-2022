import {RepoItem} from "../../store/GitHubStore/types";
import React from "react";

export interface IRepoTile {
    item: RepoItem;
    onClick: (e: React.MouseEvent) => void;
}
