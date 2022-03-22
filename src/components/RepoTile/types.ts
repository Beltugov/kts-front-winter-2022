import { RepoItemModel } from "@store/models/gitHub/repoItem";

export interface IRepoTile {
  item: RepoItemModel;
  showDrawer: (repo: string) => void;
}
